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

    getUsers: async () => {
      const response = await axiosInstance.get('/Users');
      return response.data;
    },
    getUsersById: async (usersId) => {
      const response = await axiosInstance.get(`/Users/${usersId}`);
      return response.data;
    },
    createUsers: async (newUsers) => {
      const response = await axiosInstance.post('/Users/register', newUsers);
      return response.data;
    },
    deleteUsers: async (usersId) => {
      const response = await axiosInstance.delete(`/Users/${usersId}`);
      return response.data;
    },
    editUsers: async (usersId,newUsers) => {
      const response = await axiosInstance.put(`/Users/${usersId}`, newUsers);
      return response.data;    
      },
    loginUsers: async (newLogin) => {
      const response = await axiosInstance.post('/Users/login', newLogin);
      return response.data;
    },
  };
  
  export default CustomerService;