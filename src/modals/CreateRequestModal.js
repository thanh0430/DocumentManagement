import React, { useState, useEffect } from "react";
import useFlowService from "../hooks/useFlowService";
import UseRequestService from "../hooks/UseRequestService";
import { jwtDecode } from "jwt-decode";
import {showErrorAlert } from '../components/shared/Notification';

function CreateRequestModal({ onClose, isAdding, title, flowData, currentRequest }) {
  const { flows } = useFlowService();
  const { createRequest, loading: creating, error: createError } = UseRequestService();
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [inputValue, setInputValue] = useState({
    title: "",
    flowId: "",
    comment: "",
  });

  useEffect(() => {
    if (!isAdding && currentRequest) {
      setInputValue({
        title: currentRequest.title || "",
        flowId: currentRequest.flowId || "",
        comment: currentRequest.comment || "",
      });
    } else {
      setInputValue({ title: "", flowId: "", comment: "" });
    }
  }, [isAdding, currentRequest]);

  const token = localStorage.getItem("token"); 
  let userId = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token); 
      userId = decodedToken?.userId;
    } catch (error) {
      console.error("Lỗi khi giải mã token:", error);
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFiles(file);
    console.log("file", file);
  };

  const handleChange = (event) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("Title", inputValue.title);
    formData.append("UserId", userId); 
    formData.append("FlowId", inputValue.flowId);
    formData.append("File", selectedFiles);
  
    const approvalSteps = [
      {
        step: "",
        userId: "",
        status: "",
        comment: "",
      },
    ];
    formData.append("ApprovalSteps", JSON.stringify(approvalSteps));
  
    try {
     await createRequest(formData);
      onClose(); 
    } catch (error) {
      showErrorAlert(error.message); 
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-center text-lg font-semibold text-foreground mb-4">
          {isAdding ? "Thêm yêu cầu phê duyệt" : "Chỉnh sửa yêu cầu phê duyệt"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Tiêu đề */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tiêu đề *</label>
            <input
              type="text"
              name="title"
              value={inputValue.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nội dung cần duyệt"
              required
            />
          </div>

          {/* Upload file */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
            <input
              type="file"
              name="File"
              multiple
              onChange={handleFileChange}
              className="py-2 px-4 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          {/* Luồng phê duyệt */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Luồng phê duyệt: *</label>
            <select
              name="flowId"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputValue.flowId}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Chọn luồng phê duyệt
              </option>
              {flows.map((flow) => (
                <option key={flow.id} value={flow.id}>
                  {flow.name}
                </option>
              ))}
            </select>
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Comment</label>
            <input
              type="text"
              name="comment"
              value={inputValue.comment}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nội dung cần duyệt"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              disabled={creating}
            >
              {creating ? "Đang gửi..." : "Gửi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRequestModal;
