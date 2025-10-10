import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL;

interface PropertyTypeResponse {
    message: string;
    data: string;
}

export const GetProperty = async (): Promise<PropertyTypeResponse> => {
    try {
        const token = Cookies.get('accessToken');
        const response = await axios.get<PropertyTypeResponse>(
            `${BASE_URL}/property-types`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        // Handle error appropriately
        console.error("Error fetching property:", error);
        throw error;
    }
};