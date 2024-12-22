import { useEffect, useState } from 'react';
import RoleService  from '../sevices/RoleService';
import { showAlert, showErrorAlert } from '../components/shared/Notification';

const UseRoleService = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchRole = async () => {
    setLoading(true);
    try {
      const response = await RoleService.getRoles();
      console.log("Response từ API:", response); // Log toàn bộ response
  
      if (response.statusCode === 200) {
        setRoles(response.data);
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
    fetchRole();
  }, []);

  const createRole = async (newRoles) => {
    setLoading(true);
    setError(null);
    try {
      const result = await RoleService.createRoles(newRoles);
      if (result.statusCode === 201) {
        showAlert(result.message);
        fetchRole();
      } else {
        showErrorAlert(result.message)
      }
    } catch (err) {
      setError(new Error('An unexpected error occurred'));
    } finally {
      setLoading(false);
    }
  };
  const deleteRole = async (roleId) => {
    setLoading(true);
    try {
      const result = await RoleService.deleteRoles(roleId);
      if (result.statusCode === 204) {
        showAlert(result.message);    
        fetchRole(); 
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
  const updateRole= async (roleId,newRoles) => {
    setLoading(true);
    try {
      const result = await RoleService.editRoles(roleId,newRoles);
      if (result.statusCode === 204) {
        showAlert(result.message);
        console.log("message", result.message); // Log dữ liệu được lưu
        fetchRole(); 
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
    roles,loading,error,message,fetchRole,createRole,deleteRole,updateRole
  };
};

export default UseRoleService;
