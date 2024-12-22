import { useEffect, useState } from 'react';
import WorkLogService  from '../sevices/WorkLogService';
import { showAlert, showErrorAlert } from '../components/shared/Notification';

const UseWorkLogService = () => {
  const [WorkLogs, setWorkLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

//   const fetchWorkLog = async () => {
//     setLoading(true);
//     try {
//       const response = await WorkLogService.getWorkLog();
//       console.log("Response từ API:", response); // Log toàn bộ response
  
//       if (response.statusCode === 200) {
//         setWorkLogs(response.data);
//         console.log("Dữ liệu lưu vào flows:", response.data); // Log dữ liệu được lưu
//       } else {
//         setError(new Error(response.message)); 
//       }
//     } catch (error) {
//       console.error("Error fetching flows:", error); // Log lỗi nếu có
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   useEffect(() => {
//     fetchWorkLog();
//   }, []);

const fetchWorkLogById = async (userId) => {
    console.log("Đang gọi API fetchWorkLogById với userId:", userId);
    setLoading(true);
    try {
      const result = await WorkLogService.getWorkLogById(userId);
      console.log("Kết quả từ API:", result);
      if (result.statusCode === 200) {
        setWorkLogs(result.data);     
      } else {
        showErrorAlert(result.message);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API fetchWorkLogById:", error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
};
  
  const createWorkLog = async (newWorkLog) => {
    setLoading(true);
    setError(null);
    try {
      const result = await WorkLogService.createWorkLog(newWorkLog);
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
  const deleteWorkLog = async (WorkLogId) => {
    setLoading(true);
    try {
      const result = await WorkLogService.deleteWorkLog(WorkLogId);
      if (result.statusCode === 204) {
        showAlert(result.message);    
        fetchWorkLogById(); 
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
  const updateWorkLog= async (WorkLogId,newWorkLog) => {
    setLoading(true);
    try {
      const result = await WorkLogService.editWorkLog(WorkLogId,newWorkLog);
      if (result.statusCode === 204) {
        showAlert(result.message);
        console.log("message", result.message); // Log dữ liệu được lưu
        fetchWorkLogById(); 
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
    WorkLogs,loading,error,message,fetchWorkLogById,createWorkLog,deleteWorkLog,updateWorkLog
  };
};

export default UseWorkLogService;
