import axios from "axios";
const baseURL = 'https://localhost:44335/api';
const axiosInstance = axios.create({
    baseURL,
    timeout: 5000, // Timeout sau 5 giây
    headers: {
      "Content-Type": "application/json",
  },
});

const TaskService = {
    getTasksByProjectId: async (projectId) => {
      const response = await axiosInstance.get(`/Task/${projectId}`);
      return response.data;
    },
    getTasksById: async (TaskId) => {
      const response = await axiosInstance.get(`/Task/${TaskId}`);
      return response.data;
    },
    getTasks: async () => {
      const response = await axiosInstance.get('/Task');
      return response.data;
    },
    createTasks: async (newTask) => {
      const response = await axiosInstance.post('/Task', newTask);
      return response.data;
    },
    deleteTasks: async (TaskId) => {
      const response = await axiosInstance.delete(`/Task/${TaskId}`);
      return response.data;
    },
    editTasks: async (TaskId,newTask) => {
      const response = await axiosInstance.put(`/Task/${TaskId}`, newTask);
      return response.data;    
      },
  };
  
  export default TaskService;