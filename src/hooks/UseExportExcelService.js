import ExportExcelService from '../sevices/ExportExcelService'; // Sửa đúng đường dẫn

const UseExportExcelService = () => {
  const fetchExcel = async () => {
    try {
      // Gọi đúng phương thức từ service
      const response = await ExportExcelService.getExportExcel();

      // Trả về dữ liệu blob
      return response;
    } catch (error) {
      console.error("Lỗi khi tải file Excel:", error);
      throw error;
    }
  };

  return { fetchExcel };
};

export default UseExportExcelService;
