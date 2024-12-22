import { useEffect, useState } from 'react';
import TaskService from '../sevices/TaskService';
import { showAlert, showErrorAlert } from '../components/shared/Notification';

const UseTaskService = (projectId) => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (projectId) {
      fetchTaskByProjectId(projectId);
    }
  }, [projectId]); 

  const fetchTaskByProjectId = async (projectId) => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await TaskService.getTasksByProjectId(projectId);
      console.log("task từ API:", response); 
      if (response.statusCode === 200) {
        setTask(response.data);
        setMessage(response.message);
      } else {
        setError(new Error(response.message));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Tạo mới task
  const createTask = async (newTasks) => {
    setLoading(true);
    setError(null);
    try {
      const result = await TaskService.createTasks(newTasks);
      if (result.statusCode === 201) {
        showAlert(result.message);
      } else {
        showErrorAlert(result.message)
      }
    } catch (err) {
      setError(new Error('An unexpected error occurred'));
    } finally {
      setLoading(false);
    }
  };

  // Xóa task
  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      const result = await TaskService.deleteTasks(taskId);
      if (result.statusCode === 204) {
        showAlert(result.message);
      } else {
        showErrorAlert(result.message)
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật task
  const updateTask = async (taskId, newTasks) => {
    setLoading(true);
    try {
      const result = await TaskService.editTasks(taskId, newTasks);
      if (result.statusCode === 204) {
        showAlert(result.message);
        console.log('message', result.message); // Log dữ liệu được lưu
      } else {
        showErrorAlert(result.message)
        console.log('message', result.message); // Log dữ liệu được lưu
      }
    } catch (error) {
      setError(error);
      console.error('Error put flows:', error); // Log lỗi nếu có
    } finally {
      setLoading(false);
    }
  };

  return {
    task,
    loading,
    error,
    message,
    fetchTaskByProjectId,
    createTask,
    deleteTask,
    updateTask,
  };
};

export default UseTaskService;
