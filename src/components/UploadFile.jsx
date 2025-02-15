import { useState } from "react";
import { useDropzone } from "react-dropzone";

const UploadFile = ({ onFileSelect }) => {
    const [file, setFile] = useState(null);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            const uploadedFile = acceptedFiles[0];
            if (uploadedFile.size > 10 * 1024 * 1024) {
                alert("File too large! (Max: 10MB)");
                return;
            }
            setFile(uploadedFile);
            onFileSelect(uploadedFile);
        },
        accept: ".exe,.js,.zip,.pdf,.png,.jpg",
    });

    return (
        <div {...getRootProps()} className="border p-4 rounded cursor-pointer">
            <input {...getInputProps()} />
            {file ? <p>{file.name}</p> : <p>Drag & drop or click to upload</p>}
        </div>
    );
};

export default UploadFile;
