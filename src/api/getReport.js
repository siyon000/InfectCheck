import axios from "axios";

const API_KEY = import.meta.env.VITE_VIRUSTOTAL_API_KEY;

export const getScanReport = async (fileId) => {
    try {
        const response = await axios.get(
            `https://www.virustotal.com/api/v3/analyses/${fileId}`,
            {
                headers: {
                    "x-apikey": API_KEY,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching scan report:", error);
        throw error;
    }
};
