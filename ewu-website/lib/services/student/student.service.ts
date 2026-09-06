import { AuthResponse, StudentInfo } from "./student.service.type";

// In-memory token storage (you might want to use a more persistent solution)
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
    Password: process.env.DEGREEVERIFICATION_PASSWORD,
  };

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
  // Check if token exists and is not expired
  if (tokenData.token && tokenData.expiry && new Date() < tokenData.expiry) {
    return tokenData.token;
  }

  // Authenticate if no valid token
  return await authenticate();
};

const formatDateOfBirth = (dateOfBirth: string): string => {
  // Convert date from various formats to DD-MM-YYYY
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

export const getStudentInfo = async (
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
