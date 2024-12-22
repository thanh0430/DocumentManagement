import { useEffect, useState } from 'react';
import ProjectService from '../sevices/ProjectService'
import { showAlert, showErrorAlert } from '../components/shared/Notification';

const UseProjectService = () => {
  const [projects, setprojects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const response = await ProjectService.getProject();
      console.log("Response từ API:", response); // Log toàn bộ response
  
      if (response.statusCode === 200) {
        setprojects(response.data);
        console.log("Dữ liệu lưu vào flows:", response.data); // Log dữ liệu được lưu
      } else {
        setError(new Error(response.message)); 
      }
    } catch (error) {
      console.error("Error fetching flows:", error); // Log lỗi nếu có
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProject();
  }, []);

  const createProject = async (newProject) => {
    setLoading(true);
    setError(null);
    try {
      const result = await ProjectService.createProject(newProject);
      if (result.statusCode === 201) {
        showAlert(result.message);
        fetchProject();
      } else {
        showErrorAlert(result.message)
      }
    } catch (err) {
      setError(new Error('An unexpected error occurred'));
    } finally {
      setLoading(false);
    }
  };
  const deleteProject = async (projectId) => {
    setLoading(true);
    try {
      const result = await ProjectService.deleteProject(projectId);
      if (result.statusCode === 204) {
        showAlert(result.message);   
        fetchProject(); 
      } else {
        showErrorAlert(result.message)
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm chỉnh sửa luồng phê duyệt
  const updateProject = async (projectId,newProject) => {
    setLoading(true);
    try {
      const result = await ProjectService.editProject(projectId,newProject);
      if (result.statusCode === 204) {
        showAlert(result.message);
        console.log("message", result.message); // Log dữ liệu được lưu
        fetchProject(); 
      } else {
        showErrorAlert(result.message)
        console.log("message", result.message); // Log dữ liệu được lưu
      }
    } catch (error) {
      setError(error);
      console.error("Error put flows:", error); // Log lỗi nếu có
    } finally {
      setLoading(false);
    }
  };
  return {
    projects,loading,error,message,fetchProject,createProject,deleteProject,updateProject
  };
};

export default UseProjectService;
