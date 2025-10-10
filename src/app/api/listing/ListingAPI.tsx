import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL;

// In your API file or types file
interface PropertyDetails {
  rent: number;
  propertyName: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  currency: string;
  description: string;
  propertyType: string; // This should be the ID
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
  const token = Cookies.get('accessToken')
  try {
    const response = await axios.post(
      `${BASE_URL}/applications`,
      payload,
      {
        headers:  { Authorization: `Bearer ${token}` },
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
