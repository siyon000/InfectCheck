import { useState } from "react";
import "./App.css";
import UploadFile from "./components/UploadFile";
import ScanResult from "./components/ScanResult";
import { scanFile } from "./api/api";
import { getScanReport } from "./api/getReport";
import { Loader2, Shield, } from "lucide-react";

function App() {
  const [file, setFile] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (selectedFile) => {
    setFile(selectedFile);
    setLoading(true);
    setError(null);

    try {
      const scanResponse = await scanFile(selectedFile);
      const fileId = scanResponse.data.id;

      setTimeout(async () => {
        try {
          const reportResponse = await getScanReport(fileId);
          setReport(reportResponse);
        } catch (err) {
          setError("Failed to get scan results. Please try again.");
          console.error("Error getting scan report:", err);
        } finally {
          setLoading(false);
        }
      }, 15000);
    } catch (err) {
      setError("Failed to scan file. Please try again.");
      console.error("Error scanning file:", err);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="decorative-circle circle-1" />
      <div className="decorative-circle circle-2" />
      <div className="decorative-circle circle-3" />

      <div className="relative min-h-screen p-6">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-4xl font-bold text-center text-white mb-12 tracking-tight">
            InfectCheck
          </h1>

          <UploadFile onFileSelect={handleFileUpload} />

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          {loading && (
            <div className="mt-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-4 shadow-lg">
                <Loader2 className="w-full h-full animate-spin text-white" />
              </div>
              <p className="mt-4 text-lg text-white font-medium">Scanning your file...</p>
            </div>
          )}

          {report && <ScanResult report={report} />}
        </div>
      </div>
    </>
  );
}

export default App;