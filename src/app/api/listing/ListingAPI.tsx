import axios from "axios";
// import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL;

interface PropertyDetails {
  rent: number;
  propertyName: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  currency: string;
  description: string;
  propertyType: string;
  maxGuests: number;
}

interface ApplicationRequest {
  propertyDetails: PropertyDetails;
}

interface ApplicationResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export const SubmitApplication = async (
  payload: ApplicationRequest
): Promise<ApplicationResponse> => {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjksImVtYWlsIjoieGloaWhvZDg5N0BhbnlzaWxvLmNvbSIsInJvbGUiOiJIT1NUIiwiaWF0IjoxNzU5ODIxNDUyLCJleHAiOjE3NjA2ODU0NTJ9.VdkQ3ta2HQ5GjPZvi-iNpeTJ26rwemispNxWMpZwP5U"
    const response = await axios.post(
      `${BASE_URL}/applications`,
      payload,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      }
    );

    return {
      success: true,
      message: response.data?.message ?? "Application submitted successfully",
      data: response.data?.data,
    };
  } catch (err) {
    // ✅ Handle all error cases properly
    if (axios.isAxiosError(err)) {
      const backendError = err.response?.data;

      // Try all possible backend message fields
      const message =
        backendError?.error?.message || // for NestJS error shape
        backendError?.message || // for standard message
        "Failed to submit application.";

      return { success: false, message };
    }

    // fallback for unknown errors
    return { success: false, message: "Unexpected error occurred." };
  }
};
