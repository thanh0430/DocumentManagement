import axios from 'axios';

const baseURL = 'https://localhost:44335/api';

const axiosInstance = axios.create({
  baseURL,
  timeout: 50000, // Timeout sau 5 giây
  headers: {
    'Content-Type': 'application/json',
  },
});

// Các hàm gọi API liên quan đến file
const fileService = {
getFiles: async (foldersId) => {
    const response = await axiosInstance.get(`/File/${foldersId}`);
    return response.data;
  },
  createFile: async (newFile) => {
    const response = await axiosInstance.post('/File', newFile);
    return response.data;
  },
  deleteFile: async (fileId,currentUserId) => {
    const response = await axiosInstance.delete(`/File/${fileId}`,{
      params: { currentUserId }
    });
    return response.data;
  },
  searchFile: async (name) => {
    const response = await axiosInstance.get(`/File/Search`, {
      params: { searchTerm: name }
    });
    return response.data;
  },
  EditFile: async (fileId, newName, currentUserId) => {
    const response = await axiosInstance.patch(`/File/${fileId}`, `"${newName}"`, {
      params: { currentUserId }
    });
    return response.data;
  },
  shareFile: async (Share) => {
    const response = await axiosInstance.post('/File/Share', Share);
    return response.data;
  },
};

export default fileService;
