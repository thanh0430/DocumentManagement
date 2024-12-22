import React, { useState } from "react";
import UseRequestService from "../hooks/UseRequestService";
import { showAlert, showErrorAlert } from "../components/shared/Notification";

export default function Approval({ onClose, currentRequest }) {
  const { Approval, Reject } = UseRequestService();
  const [note, setNote] = useState("");

  const handleApproval = async () => {
    const requestId = currentRequest.id; // ID của yêu cầu
    const approvalData = {
      comment: note, // Truyền ghi chú vào đây
    };

    try {
      await Approval(requestId, approvalData);
      onClose();
    } catch (error) {}
  };
  const handleFileDownload = async () => {
    try {
      const fileUrl = currentRequest?.files;

      if (!fileUrl) {
        showErrorAlert("Không có URL file để tải.");
        return;
      }

      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("Không thể tải file từ server.");

      // Tạo blob và link tải
      const blob = await response.blob();
      const fileName = fileUrl.split("/").pop() || "TaiLieuLienQuan.pdf"; // Lấy tên file từ URL
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      // Dọn dẹp
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      showAlert("Tải file thành công.");
    } catch (error) {
      console.error("Lỗi khi tải file:", error);
      showErrorAlert("Không thể tải file. Vui lòng thử lại.");
    }
  };
  const handleReject = async () => {
    const requestId = currentRequest.id;
    const approvalData = {
      comment: note,
    };

    try {
      const response = await Reject(requestId, approvalData);
      console.log("Phê duyệt không thành công:", response);
      onClose();
    } catch (error) {
      console.error("Lỗi phê duyệt:", error);
    }
  };

  return (
    <div className="justify-center items-center flex fixed inset-0 bg-opacity-30 backdrop-blur-sm">
      <div className="border rounded-lg border-gray-300 p-4 bg-white w-full max-w-lg h-auto">
        <div className="relative w-full max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-xl">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-3xl"
            aria-label="Close"
          >
            &times;
          </button>

          <h1 className="text-xl font-bold mb-4">{currentRequest?.title}</h1>
          <div className="mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
              <div>
                <p className="font-medium">Người gửi: {currentRequest?.name}</p>
                <p className="text-gray-600">Phòng ban: Nhân sự</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Đã gửi: {currentRequest?.createdDate.slice(0, 10) || "N/A"}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Tài liệu liên quan
            </label>
            {currentRequest?.files ? (
              <button
                onClick={handleFileDownload}
                className="text-blue-600 hover:underline mt-1"
              >
                Tải xuống tài liệu
              </button>
            ) : (
              <span className="text-gray-500 italic">Không có tài liệu</span>
            )}
          </div>

          <div className="mb-4">
            <h2 className="text-md font-medium">Hồ sơ phê duyệt</h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium">Tên bước</label>
                <span className="text-gray-800">Phê duyệt</span>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Người phê duyệt
                </label>
                {currentRequest.approvalSteps.map((item) => (
                  <div key={item.userId}>
                    <p className="text-gray-800">{item.userName}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium">Kết quả</label>
              <span className="text-gray-800">Đang được xét duyệt</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Ghi chú</label>
            <textarea
              className="border border-gray-300 rounded-lg p-2 w-full h-24"
              placeholder="Nhập ghi chú tại đây..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleReject}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Từ chối
            </button>
            <button
              onClick={handleApproval}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Phê duyệt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
