import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL;

interface SignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface SignUpRes {
  message: string;
  success: boolean;
  data?: string; // optional, depending on API
}

export const SignUp = async (payload: SignUpRequest): Promise<SignUpRes> => {
  try {
    const response = await axios.post<SignUpRes>(`${BASE_URL}/auth/register`, payload);

    return {
      ...response.data,
      success: response.data.success ?? true, // ensures success defaults to true
    };
  } catch (error) {
    const axiosError = error as AxiosError<SignUpRes>;

    if (axiosError.response?.data) {
      return {
        ...axiosError.response.data,
        success: false, // make sure failed response is marked false
      };
    }

    return {
      success: false,
      message: "Signup failed. Please try again.",
      data: "", // optional: safe fallback
    };
  }
};
