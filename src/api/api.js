import axios from "axios";

const API_KEY = import.meta.env.VITE_VIRUSTOTAL_API_KEY;

export const scanFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
        "https://www.virustotal.com/api/v3/files",
        formData,
        {
            headers: {
                "x-apikey": API_KEY,
                "Content-Type": "multipart/form-data",
            },
        }
    );
    console.log(response.data);
    return response.data;




};


