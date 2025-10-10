import axios from "axios";

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
  data?: string;
}

export const SignUp = async (payload: SignUpRequest): Promise<SignUpRes> => {
  try {
    const response = await axios.post<SignUpRes>(`${BASE_URL}/auth/register`, payload);
    
    // Ensure success field is always defined
    return {
      success: response.data.success ?? true, // Default to true if undefined
      message: response.data.message || "Account created successfully", 
      data: response.data.data
    };

  } catch (error: unknown) {
    console.error('SignUp API Error:', error);
    
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data;
      
      // Extract messages from the nested error structure
      if (errorData?.error?.message) {
        const messages = errorData.error.message;
        
        // Return the first error message only
        if (Array.isArray(messages) && messages.length > 0) {
          return {
            success: false,
            message: messages[0],
          };
        }
        
        // If it's a single string
        return {
          success: false,
          message: messages,
        };
      }
      
      // Handle other error formats
      if (errorData && typeof errorData === 'object' && 'message' in errorData) {
        return {
          success: false,
          message: (errorData).message,
        };
      }
    }
    
    // Fallback for unknown errors
    return {
      success: false,
      message: "Signup failed. Please try again.",
    };
  }
};