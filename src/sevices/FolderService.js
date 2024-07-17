import axios from 'axios';

const baseURL = 'https://localhost:7091/api'; 

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000, // Timeout sau 5 giây
  headers: {
    'Content-Type': 'application/json',
  },
});

// Các hàm gọi API liên quan đến thư mục
const folderService = {
  getFolders: async () => {
    const response = await axiosInstance.get('/folders');
    return response.data;
  },
  createFolder: async (newFolder) => {
    const response = await axiosInstance.post('/folders', newFolder);
    return response.data;
  },
  deleteFolder: async (folderId) => {
    const response = await axiosInstance.delete(`/folders/${folderId}`);
    return response.data;
  }
};

export default folderService;

