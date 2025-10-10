import axios from "axios";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL;

interface ForgotPasswordRequest {
  email: string;
}

interface ForgotPasswordSuccessResponse {
  success: boolean;
  data: string;
  message?: string;
}

interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
    timestamp: string;
  };
}

type ForgotPasswordResult = 
  | { success: true; data: string; message?: string }
  | { success: false; message: string };

export const ForgotPassword = async (
  payload: ForgotPasswordRequest
): Promise<ForgotPasswordResult> => {
  try {
    const response = await axios.post<ForgotPasswordSuccessResponse>(
      `${BASE_URL}/auth/forgot-password`, 
      payload
    );

    // Store email in cookies
    Cookies.set("user-email", payload.email, {
      expires: 1,
      path: "/",
    });

    return {
      success: true,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    
    // Extract error message from backend response
    if (axiosError.response?.data?.error?.message) {
      return {
        success: false,
        message: axiosError.response.data.error.message,
      };
    }

    // Fallback error message
    return {
      success: false,
      message: "Failed to send reset email. Please try again.",
    };
  }
};