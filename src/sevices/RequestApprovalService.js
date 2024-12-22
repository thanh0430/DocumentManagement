import axios from "axios";
const baseURL = "https://localhost:44335/api";
const axiosInstance = axios.create({
  baseURL,
  timeout: 5000, // Timeout sau 5 giây
});


const RequestDocumentService = {
  getRequest: async () => {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(`/RequestDocument`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  createRequest: async (newRequestDocument) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(      
      "https://localhost:44335/api/RequestDocument",
      newRequestDocument,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response from API create requesst:", response.data);
    return response.data;
  },
  deleteRequest: async (requestId) => {
    const response = await axiosInstance.delete(
      `/RequestDocument/${requestId}`
    );
    return response.data;
  },
  editRequest: async (requestId, newRequestDocument) => {
    const response = await axiosInstance.put(
      `/RequestDocument/${requestId}`,
      newRequestDocument
    );
    return response.data;
  },
  Approval: async (requestId, Approval) => {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.put(
      `/RequestDocument/${requestId}/Approval`,
      Approval,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,

        },
      }
    );
    return response.data;
  },
  Reject: async (requestId, Reject) => {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.put(
      `/RequestDocument/${requestId}/Reject`,
      Reject,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,

        },
      }
    );
    return response.data;
  },
  getfile: async (fileName) => {
    const response = await axiosInstance.get(`/RequestDocument/download-file`, {
      params: { fileName },
      responseType: "blob", // Định dạng trả về là blob
    });
    return response.data; // Trả về blob
  }  
};

export default RequestDocumentService;
