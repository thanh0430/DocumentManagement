import { useEffect, useState } from 'react';
import FlowService from '../sevices/ApprovalFlow';
import { showAlert, showErrorAlert } from '../components/shared/Notification';

const useFlowService = () => {
  const [flows, setFlows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchFlows = async () => {
    setLoading(true);
    try {
      const response = await FlowService.getFlow();
      console.log("Response từ API:", response); 
  
      if (response.statusCode === 200) {
        setFlows(response.data);

        console.log("Dữ liệu lưu vào flows:", response.data); 
      } else {
        setError(new Error(response.message)); 
      }
    } catch (error) {
      console.error("Error fetching flows:", error); 
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchFlows();
  }, []);

  const createFlow = async (newFlow) => {
    setLoading(true);
    setError(null);
    try {
      const result = await FlowService.createFlow(newFlow);
      if (result.statusCode === 201) {
        showAlert(result.message);
        fetchFlows();
      } else {
         showErrorAlert(result.message)
      }
    } catch (err) {
      setError(new Error('An unexpected error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const deleteFlow = async (flowId) => {
    setLoading(true);
    try {
      const result = await FlowService.deleteFlow(flowId);
      if (result.statusCode === 204) {
        showAlert(result.message);
      
        fetchFlows(); 
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
  const updateFlow = async (flowId,newFlow) => {
    setLoading(true);
    try {
      const result = await FlowService.editFlow(flowId,newFlow);
      if (result.statusCode === 204) {
        showAlert(result.message);
        console.log("message", result.message); // Log dữ liệu được lưu
        fetchFlows(); 
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
    flows,loading,error,message,fetchFlows,createFlow,deleteFlow,updateFlow
  };
};

export default useFlowService;
