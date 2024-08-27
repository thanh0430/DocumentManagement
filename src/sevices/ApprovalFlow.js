import axios from "axios";
const baseURL = 'https://localhost:7091/api';

const axiosInstance = axios.create({
    baseURL,
  timeout: 5000, // Timeout sau 5 giây
  headers: {
    "Content-Type": "application/json",
  },
});

// Các hàm gọi API liên quan đến thư mục
const FlowService = {
    // getRoles: async () => {
    //     const response = await axiosInstance.get('/roles');
    //     return response.data;
    //   },
    getFlow: async () => {
      const response = await axiosInstance.get('/ApprovalFlow');
      return response.data;
    },
    createFlow: async (newFlow) => {
      const response = await axiosInstance.post('/ApprovalFlow', newFlow);
      return response.data;
    },
    deleteFlow: async (flowId) => {
      const response = await axiosInstance.delete(`/ApprovalFlow/${flowId}`);
      return response.data;
    },
    editFlow: async (flowId,newFlow) => {
        const response = await axiosInstance.put(`/ApprovalFlow/${flowId}`,newFlow);
        return response.data;
      },
  };
  
  export default FlowService;