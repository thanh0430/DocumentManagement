import { useEffect, useState } from 'react';
import FlowService from '../sevices/ApprovalFlow';

const useFlowService = () => {
  const [Flows, setflows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchFlows();
  }, []);

  const fetchFlows = async () => {
    setLoading(true);
    try {
      const response = await FlowService.getFlow();
      if (response.statusCode === 200) {
        setflows(response.data);
      } else {
        setError(new Error(response.message)); 
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const createFlow = async (newFlow) => {
    setLoading(true);
    setError(null);
    try {
      const result = await FlowService.createFlow(newFlow);
      if (result.statusCode === 201) {
        setMessage(result.message);
        fetchFlows();
      } else {
        setError(new Error(result.message));
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
        setMessage(result.message);
        fetchFlows(); 
      } else {
        setError(new Error(result.message));
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
        setMessage(result.message);
        fetchFlows(); 
      } else {
        setError(new Error(result.message));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    Flows,loading,error,message,fetchFlows,createFlow,deleteFlow,updateFlow
  };
};

export default useFlowService;
