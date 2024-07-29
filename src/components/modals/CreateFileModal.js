import React, { useState } from "react";
import useFileService from "../../hooks/UseFileService";
import { showAlert, showErrorAlert } from '../shared/Notification';

export default function CreateFolderModal({ onClose, isAdding, folder }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { createFile } = useFileService();
  
  const handleFileChange = (event) => {
    setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
  };
  
  const handleUploadFile = async () => {
    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('files', file);
    });
    formData.append('userId', 1);
    formData.append('folderId', folder.id);

    try {
      const result = await createFile(formData);
      if (result.statusCode === 201) {
        showAlert(result.message);
        onClose();
      } else {
        showErrorAlert(result.message);
      }
    } catch (error) {
      showErrorAlert(error.message);
    }
  };
  return (
    <div className="justify-center items-center flex fixed inset-0 bg-opacity-30 backdrop-blur-sm">
      <div className="border rounded-lg border-gray-300 bg-white w-3/5 h-4/6 flex flex-col">
        <div className="flex justify-center items-center gap-36 w-full mt-5 border-2 border-dashed h-1/3">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Chọn một hay nhiều file từ máy của bạn.
            </h2>
            <p className="mb-4">
              Kéo thả file tài liệu (.doc, .xlsx, .pdf...) vào đây
            </p>
          </div>
          <div className="border-gray-400 rounded-lg w-40 border-2 h-14 flex justify-center items-center bg-blue-500 hover:bg-blue-700">
            <label htmlFor="fileInput" className="cursor-pointer flex items-center">
              <span className="text-white">Chọn tệp tin</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 mx-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16a4 4 0 01-4-4h5l5 4z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 13V6a2 2 0 00-2-2h-4l-4 4m6 6v10M4 7v10a2 2 0 002 2h16"
                />
              </svg>
            </label>
            <input
              id="fileInput"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex flex-col items-start p-4 mt-2 overflow-y-auto max-h-32">
          {selectedFiles.length > 0 && (
            <ul className="list-disc list-inside">
              {selectedFiles.map((file, index) => (
                <li key={index} className="mb-1">
                  {file.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-end p-4 mt-auto">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded h-10 mr-5"
          >
            Hủy
          </button>
          <button onClick={handleUploadFile} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md h-10">
            TẢI LÊN
          </button>
        </div>
      </div>
    </div>
  );
}
