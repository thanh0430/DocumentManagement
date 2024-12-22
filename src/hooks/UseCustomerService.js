import { useEffect, useState } from "react";
import CustomerService from "../sevices/CustomerService";
import { showAlert, showErrorAlert } from "../components/shared/Notification";

const UseCustomerService = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchCustomer = async () => {
    setLoading(true);
    try {
      const response = await CustomerService.getUsers();
      console.log("Response từ API:", response); // Log toàn bộ response

      if (response.statusCode === 200) {
        setCustomers(response.data);
        console.log("Dữ liệu lưu vào flows:", response.data); // Log dữ liệu được lưu
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error("Error fetching flows:", error); // Log lỗi nếu có
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomerById = async (userId) => {
    setLoading(true);
    try {
      const response = await CustomerService.getUsersById(userId);
      console.log("Response từ API:", response); // Log toàn bộ response
  
      if (response && response.data) {
        console.log("Dữ liệu trả về:", response.data);
        return response.data; // Return dữ liệu về component
      } else {
        setError("Không tìm thấy thông tin người dùng.");
        return null; // Trả về null nếu không có dữ liệu
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error.message);
      setError("Đã xảy ra lỗi khi tải thông tin người dùng.");
      return null; // Trả về null khi có lỗi
    } finally {
      setLoading(false);
    }
  };
  

  const createCustomer = async (newUsers) => {
    setLoading(true);
    setError(null);
    try {
      const result = await CustomerService.createUsers(newUsers);
      if (result.statusCode === 201) {
        showAlert(result.message);
        fetchCustomer();
      } else {
        showErrorAlert(result.message);
      }
    } catch (err) {
      setError(new Error("An unexpected error occurred"));
    } finally {
      setLoading(false);
    }
  };
  const deleteCustomer = async (requestId) => {
    setLoading(true);
    try {
      const result = await CustomerService.deleteUsers(requestId);
      if (result.statusCode === 204) {
        showAlert(result.message);
        fetchCustomer();
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
  const updateCustomer = async (requestId, newUsers) => {
    setLoading(true);
    try {
      const result = await CustomerService.editUsers(requestId, newUsers);
      if (result.statusCode === 204) {
        showAlert(result.message);
        console.log("message", result.message); // Log dữ liệu được lưu
        fetchCustomer();
      } else {
        showErrorAlert(result.message);
        console.log("message", result.message); // Log dữ liệu được lưu
      }
    } catch (error) {
      setError(error);
      console.error("Error put flows:", error); // Log lỗi nếu có
    } finally {
      setLoading(false);
    }
  };
  const loginCustomer = async (newLogin) => {
    setLoading(true);
    setError(null);
    try {
      const result = await CustomerService.loginUsers(newLogin);
      return result;
    } catch (err) {
      setError(new Error("An unexpected error occurred"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    customers,
    loading,
    error,
    message,
    fetchCustomer,
    fetchCustomerById,
    createCustomer,
    deleteCustomer,
    updateCustomer,
    loginCustomer,
  };
};

export default UseCustomerService;
