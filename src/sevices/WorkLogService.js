import axios from "axios";
const baseURL = 'https://localhost:44335/api';

const axiosInstance = axios.create({
    baseURL,
    timeout: 5000, // Timeout sau 5 giây
    headers: {
      "Content-Type": "application/json",
  },
});

const WorkLogService = {

    getWorkLog: async () => {
        
      const response = await axiosInstance.get('/WorkLog');
      return response.data;
    },

    getWorkLogById: async (userId) => {
        const token = localStorage.getItem("token");
        console.log("Token từ localStorage:", token);
        try {
          const response = await axiosInstance.get(`/WorkLog/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Phản hồi từ API:", response.data);
          return response.data;
        } catch (error) {
          console.error("Lỗi khi gọi API getWorkLogById:", error.message);
          throw error;
        }
      },
      

    createWorkLog: async (newWorkLog) => {
      const response = await axiosInstance.post('/WorkLog', newWorkLog);
      return response.data;
    },

    deleteWorkLog: async (WorkLogId) => {
      const response = await axiosInstance.delete(`/WorkLog/${WorkLogId}`);
      return response.data;
    },

    editWorkLog: async (WorkLogId,newWorkLog) => {
      const response = await axiosInstance.put(`/WorkLog/${WorkLogId}`, newWorkLog);
      return response.data;    
      },
  };
  
  export default WorkLogService;