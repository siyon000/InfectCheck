import axios from "axios";

const API_KEY = import.meta.env.VITE_VIRUSTOTAL_API_KEY; // Load API key

export const scanFile = async (file) => {
    console.log(file);
    const formData = new FormData(); // Create a new FormData object
    formData.append("file", file);   // Add the file to FormData with the key "file"


    const response = await axios.post(     // Send POST request
        "https://www.virustotal.com/api/v3/files",
        formData, // The file is included in the request body
        {
            headers: {
                "x-apikey": API_KEY,       // Add API key
                "Content-Type": "multipart/form-data", // Set content type
            },
        }
    );
    console.log(response.data);            // Log scan result
    return response.data;                  // Return the API response
};
