import axios from "axios";
const baseURL = 'https://localhost:44335/api';
const axiosInstance = axios.create({
    baseURL,
    timeout: 50000, // Timeout sau 5 giây
    headers: {
      "Content-Type": "application/json",
  },
});

const CustomerService = {

    getProject: async () => {
      const response = await axiosInstance.get('/Project');
      return response.data;
    },
    createProject: async (newProject) => {
      const response = await axiosInstance.post('/Project', newProject);
      return response.data;
    },
    deleteProject: async (projectId) => {
      const response = await axiosInstance.delete(`/Project/${projectId}`);
      return response.data;
    },
    editProject: async (projectId,newProject) => {
      const response = await axiosInstance.put(`/Project/${projectId}`, newProject);
      return response.data;    
      },
  };
  
  export default CustomerService;