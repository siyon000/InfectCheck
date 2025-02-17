import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

const UploadFile = ({ onFileSelect }) => {
    const [file, setFile] = useState(null);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => {
            const uploadedFile = acceptedFiles[0];
            if (uploadedFile.size > 10 * 1024 * 1024) {
                alert("File too large! (Max: 10MB)");
                return;
            }
            setFile(uploadedFile);
            onFileSelect(uploadedFile);
        },
        accept: {
            'application/x-msdownload': ['.exe'],
            'application/javascript': ['.js'],
            'application/zip': ['.zip'],
            'application/pdf': ['.pdf'],
            'image/png': ['.png'],
            'image/jpeg': ['.jpg']
        }
    });

    return (
        <div className="w-full max-w-xl mx-auto">
            <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-xl p-12 transition-all duration-300 backdrop-blur-sm
                    ${isDragActive
                        ? 'border-blue-400 bg-blue-400/10'
                        : 'border-gray-400/30 hover:border-gray-400/50 bg-white/5'
                    }`}
            >
                <input {...getInputProps()} />
                <div className="space-y-6 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-4 shadow-lg">
                        <Upload className="w-full h-full text-white" />
                    </div>

                    {file ? (
                        <div className="space-y-2">
                            <p className="text-lg font-medium text-white">{file.name}</p>
                            <p className="text-sm text-gray-300">Click or drag to change file</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-xl font-medium text-white">
                                Drop your file here or click to upload
                            </p>
                            <p className="text-sm text-gray-300">
                                Supports .exe, .js, .zip, .pdf, .png, .jpg
                            </p>
                            <p className="text-xs text-gray-400">
                                Maximum file size: 10MB
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default UploadFile;