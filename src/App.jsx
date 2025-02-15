import { useState } from "react";
import "./App.css";
import UploadFile from "./components/UploadFile";
import ScanResult from "./components/ScanResult";
import { scanFile } from "./api/api";
import { getScanReport } from "./api/getReport";

function App() {
  const [file, setFile] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (selectedFile) => {
    setFile(selectedFile);
    setLoading(true);

    try {
      const scanResponse = await scanFile(selectedFile);
      const fileId = scanResponse.data.id;

      // Polling to get scan results
      setTimeout(async () => {
        const reportResponse = await getScanReport(fileId);
        setReport(reportResponse);
        setLoading(false);
      }, 10000);
    } catch (error) {
      console.error("Error scanning file:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Secure File Upload & Malware Analysis</h1>
        <UploadFile onFileSelect={handleFileUpload} />
        {loading && <p className="mt-4 text-blue-500">Scanning file...</p>}
        {report && <ScanResult report={report} />}
      </div>
    </>
  );
}

export default App;
