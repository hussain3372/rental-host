import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL;

interface OtpVerificationRequest {
  otp: string;
  email: string;
}

interface OTPRes {
  success: boolean;
  message: string;
  data?: string;
}

interface BackendError {
  error?: {
    message?: string;
  };
  message?: string;
}

export const OtpVerification = async (
  payload: OtpVerificationRequest
): Promise<OTPRes> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/verify-otp`, payload);

    return {
      success: true,
      message: response.data?.message ?? "OTP verified successfully",
      data: response.data?.data,
    };
  } catch (err) {
    const axiosError = err as AxiosError<BackendError>;
    const backendError = axiosError.response?.data;

    return {
      success: false,
      message:
        backendError?.error?.message ??
        backendError?.message ??
        "OTP Verification failed. Please try again.",
    };
  }
};
