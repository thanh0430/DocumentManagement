import { useEffect, useState } from 'react';
import RequestDocumentService from '../sevices/RequestApprovalService';
import { showAlert, showErrorAlert } from '../components/shared/Notification';

const UseRequestService = () => {
  const [requests, setRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchRequest = async () => {
    setLoading(true);
    try {
      const response = await RequestDocumentService.getRequest();
      console.log("Response từ API:", response); 
  
      if (response.statusCode === 200) {
        setRequest(response.data);
        console.log("Dữ liệu lưu vào Requests:", response.data); 
      } else {
        setError(new Error(response.message)); 
      }
    } catch (error) {
      console.error("Error fetching Requests:", error); 
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchRequest();
  }, []);

  const createRequest = async (newRequest) => {
    setLoading(true);
    setError(null);
  
    try {
      const result = await RequestDocumentService.createRequest(newRequest);
  
      if (result.statusCode === 201) {
        showAlert(result.message);
        fetchRequest(); 
      } else {
        showErrorAlert(result.message)
      }
    } catch (err) {
      setError(new Error('An unexpected error occurred'));
      throw err; 
    } finally {
      setLoading(false);
    }
  };
  

  const deleteRequest = async (RequestId) => {
    setLoading(true);
    try {
      const result = await RequestDocumentService.deleteRequest(RequestId);
      if (result.statusCode === 204) {
        showAlert(result.message);    
        fetchRequest(); 
      } else {
        showErrorAlert(result.message);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm chỉnh sửa luồng phê duyệt
  const updateRequest = async (RequestId,newRequest) => {
    setLoading(true);
    try {
      const result = await RequestDocumentService.editRequest(RequestId,newRequest);
      if (result.statusCode === 204) {
        showAlert(result.message);   
        fetchRequest(); 
      } else {
        showErrorAlert(result.message);
      }
    } catch (error) {
      setError(error);
      console.error("Error put Requests:", error); 
    } finally {
      setLoading(false);
    }
  };
  const Approval = async (RequestId,Approval) => {
    setLoading(true);
    try {
      const result = await RequestDocumentService.Approval(RequestId,Approval);
      if (result.statusCode === 204) {
        showAlert(result.message);
        console.log("message", result.message); 
        fetchRequest(); 
      } else {
        showErrorAlert(result.message);
        console.log("message", result.message); 
      }
    } catch (error) {
      setError(error);
      console.error("Error put Requests:", error); 
    } finally {
      setLoading(false);
    }
  };
  const Reject = async (RequestId,Reject) => {
    setLoading(true);
    try {
      const result = await RequestDocumentService.Reject(RequestId,Reject);
      if (result.statusCode === 204) {
        showAlert(result.message);
        console.log("message", result.message);
        fetchRequest(); 
      } else {
        showErrorAlert(result.message);;
        console.log("message", result.message); 
      }
    } catch (error) {
      setError(error);
      console.error("Error put Requests:", error); 
    } finally {
      setLoading(false);
    }
  };

  const fetchFile = async () => {
    setLoading(true);
    try {
      const response = await RequestDocumentService.getfile();
      console.log("Response từ API:", response); 
      return response

    } catch (error) {
      console.error("Error fetching Requests:", error); 
      setError(error);
    } 
  };
  return {
    requests,loading,error,message,fetchRequest,createRequest,deleteRequest,updateRequest, Approval,Reject,fetchFile
  };
};

export default UseRequestService;
