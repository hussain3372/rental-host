import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL;

interface CreatePasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordRes {
  message: string;
  success: boolean;
  data?: string;
}

export const CreatePassword = async (
  payload: CreatePasswordPayload
): Promise<PasswordRes> => {
  try {
    const response = await axios.post<PasswordRes>(
      `${BASE_URL}/auth/reset-password`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      ...response.data,
      success: response.data.success ?? true,
    };
  } catch (error) {
    const axiosError = error as AxiosError<PasswordRes>;

    if (axiosError.response?.data) {
      return axiosError.response.data;
    }

    return {
      success: false,
      message: "Password reset failed. Please try again.",
    };
  }
};