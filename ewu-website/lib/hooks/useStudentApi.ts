import { StudentInfo } from "@lib/services/student/student.service.type";
import { useState, useCallback } from "react";

export const useStudentApi = () => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchStudent = useCallback(
    async (studentId: string, dateOfBirth: string) => {
      setLoading(true);
      setError(null);
      setStudentInfo(null);

      try {
        const response = await fetch(
          `/api/student/${studentId}/${dateOfBirth}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch student information"
          );
        }

        const data = await response.json();
        setStudentInfo(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    studentInfo,
    loading,
    error,
    searchStudent,
  };
};
