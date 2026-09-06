import { NextRequest, NextResponse } from "next/server";

// Types
interface AuthResponse {
  userName: string;
  token: string;
  tokenExpiresAfterInMinutes: string;
}

interface StudentInfo {
  message: string;
  status: string;
  studentId: string;
  uniqueId: string;
  studentName: string;
  programCode: number;
  programName: string;
  programShortName: string;
  academicDepartmentName: string;
  cgpa: string;
  creditsCompleted: number;
  mobileNo: string;
  personalEmailAddress: string;
  fatherMobileNo: string;
  motherMobileNo: string;
  fatherName: string;
  motherName: string;
  dateofBirth: string;
  bloodGroup: string;
  nationalId: string;
  birthRegistrationNo: string;
  presentAddress: string;
  permanentAddress: string;
  convocationName: string;
  major: string;
  minor: string;
  completionSemester: string;
}

// In-memory token storage
let tokenData: {
  token: string | null;
  expiry: Date | null;
} = {
  token: null,
  expiry: null,
};

const authenticate = async (): Promise<string> => {
  const credentials = {
    Username: process.env.DEGREEVERIFICATION_USER,
    Password: process.env.DEGREEVERIFICATION_USER_PASSWORD,
  };

  // console.log("Authenticating with credentials:", credentials);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_EWU_BASE_URL}/users/authenticate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...credentials }),
      }
    );

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status}`);
    }

    const authData: AuthResponse = await response.json();

    tokenData.token = authData.token;
    const expiryMinutes = parseInt(authData.tokenExpiresAfterInMinutes);
    tokenData.expiry = new Date(Date.now() + expiryMinutes * 60 * 1000);

    return tokenData.token;
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error("Failed to authenticate with the API");
  }
};

const getValidToken = async (): Promise<string> => {
  if (tokenData.token && tokenData.expiry && new Date() < tokenData.expiry) {
    return tokenData.token;
  }
  return await authenticate();
};

const formatDateOfBirth = (dateOfBirth: string): string => {
  const date = new Date(dateOfBirth);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const getErrorMessage = (status: number): string => {
  switch (status) {
    case 400:
      return "Bad Request: The request was invalid or missing required parameters.";
    case 401:
      return "Unauthorized: The API key provided is not valid.";
    case 404:
      return "Not Found: The requested resource could not be found.";
    case 408:
      return "Request Timeout: The request exceeded the time limit.";
    case 500:
      return "Internal Server Error: An error occurred on the server.";
    default:
      return `Unknown error occurred (Status: ${status})`;
  }
};

const getStudentInfo = async (
  studentId: string,
  dateOfBirth: string
): Promise<StudentInfo> => {
  try {
    const token = await getValidToken();
    const formattedDateOfBirth = formatDateOfBirth(dateOfBirth);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_EWU_BASE_URL}/student/getstudentdegreeinfobystudentid/${studentId}/${formattedDateOfBirth}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorMessage = getErrorMessage(response.status);
      throw new Error(errorMessage);
    }

    const studentData: StudentInfo = await response.json();
    return studentData;
  } catch (error) {
    console.error("Error fetching student info:", error);
    throw error;
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId");
  const dateOfBirth = searchParams.get("dateOfBirth");

  if (!studentId || !dateOfBirth) {
    return NextResponse.json(
      { error: "Missing studentId or dateOfBirth" },
      { status: 400 }
    );
  }

  try {
    const result = await getStudentInfo(studentId, dateOfBirth);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
