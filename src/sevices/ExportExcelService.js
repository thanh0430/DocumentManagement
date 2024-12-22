import axios from "axios";

const baseURL = 'https://localhost:44335/api';

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const ExportExcelService = {
  getExportExcel: async () => {
    const response = await axiosInstance.get('/ExportExcel/export-excel', {
      responseType: "blob", 
    });
    return response.data; 
  },
};

export default ExportExcelService; 
