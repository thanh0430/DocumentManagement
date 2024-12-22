import React from "react";
import UseExportExcelService from "../hooks/UseExportExcelService";

export default function Report() {
  const { fetchExcel } = UseExportExcelService();

  const exportToExcel = async () => {
    try {
      const fileData = await fetchExcel();

      // Tạo URL từ Blob và tải file
      const url = window.URL.createObjectURL(new Blob([fileData]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "SalaryReport.xlsx");

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("File tải xuống thành công");
    } catch (error) {
      console.error("Lỗi khi tải file Excel:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full ">
        <h1 className="text-2xl font-bold mb-4 text-center">Báo Cáo Thống Kê</h1>

        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex justify-end"
        >
          Xuất Excel
        </button>
      </div>
    </div>
  );
}
