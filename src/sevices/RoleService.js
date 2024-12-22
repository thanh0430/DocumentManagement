import axios from "axios";
const baseURL = 'https://localhost:44335/api';
const axiosInstance = axios.create({
    baseURL,
    timeout: 5000, // Timeout sau 5 giây
    headers: {
      "Content-Type": "application/json",
  },
});

const RoleService = {

    getRoles: async () => {
      const response = await axiosInstance.get('/Roles');
      return response.data;
    },
    createRoles: async (newRoles) => {
      const response = await axiosInstance.post('/Roles', newRoles);
      return response.data;
    },
    deleteRoles: async (RolesId) => {
      const response = await axiosInstance.delete(`/Roles/${RolesId}`);
      return response.data;
    },
    editRoles: async (RolesId,newRoles) => {
      const response = await axiosInstance.put(`/Roles/${RolesId}`, newRoles);
      return response.data;    
      },
  };
  
  export default RoleService;