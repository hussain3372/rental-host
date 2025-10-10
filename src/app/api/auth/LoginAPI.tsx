import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL;

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginSuccessResponse {
  accessToken: string;
  data: string;
  message: string;
  success: boolean;
}

interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
  };
}

type LoginResult = 
  | { success: true; data: LoginSuccessResponse; message: string }
  | { success: false; message: string };

export const Login = async (payload: LoginRequest): Promise<LoginResult> => {
  try {
    const response = await axios.post<LoginSuccessResponse>(`${BASE_URL}/auth/login`, payload);
    
    // Store the token if it exists
    if (response.data.accessToken) {
      Cookies.set("accessToken", response.data.accessToken, { expires: 7 });
    }
    
    return {
      success: true,
      data: response.data,
      message: response.data.message || "Login successful"
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
      message: "Login failed. Please try again.",
    };
  }
};