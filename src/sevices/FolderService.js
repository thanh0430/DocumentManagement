import axios from 'axios';

const baseURL = 'https://localhost:44335/api'; 

const axiosInstance = axios.create({
  baseURL,
  timeout: 50000, // Timeout sau 50 giây
  headers: {
    'Content-Type': 'application/json',
  },
});

// Các hàm gọi API liên quan đến thư mục
const folderService = {
  getFolders: async (currentUserId) => {
    const response = await axiosInstance.get('/Folder', {
      params: { currentUserId },
    });
    return response.data;
  },
  createFolder: async (newFolder) => {
    const response = await axiosInstance.post('/Folder', newFolder);
    return response.data;
  },
  deleteFolder: async (folderId,currentUserId) => {
    const response = await axiosInstance.delete(`/Folder/${folderId}`,{
      params: { currentUserId }
    });
    return response.data;
  },
  searchFolder: async (name) => {
    const response = await axiosInstance.get(`/Folder/Search`, {
      params: { searchTerm: name }
    });
    return response.data;
  },
  EditFolder: async (folderId, newName, currentUserId) => {
    const response = await axiosInstance.patch(`/Folder/${folderId}`, `"${newName}"`, {
      params: { currentUserId }
    });
    return response.data;
  },
  shareFolder: async (Share) => {
    const response = await axiosInstance.post('/Folder/Share', Share);
    return response.data;
  },
};

export default folderService;
