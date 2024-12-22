import React from "react";
import useFlowService from "../hooks/useFlowService";
import { showAlert, showErrorAlert } from "../components/shared/Notification";

const DeleteFlowModal = ({ onClose, flowId }) => {
  const { deleteFlow } = useFlowService();

  const handleDelete = async () => {
    try {
    await deleteFlow(flowId);    
    onClose(); 
    } catch (error) {
      showErrorAlert(error.message); 
    }
  };

  return (
    <div className="justify-center items-center flex fixed inset-0 bg-opacity-30 backdrop-blur-sm ">
      <div className="border rounded-lg border-gray-300 p-4 bg-white">
        <div className="text-left">          
          <p className="text-red-500 mt-3 font-normal text-lg">
            Bạn có chắc chắn muốn xóa ?{" "}
          </p>
        </div>
        <form className="w-96 ">
          <div className="flex justify-end mt-28">
            <button
               onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded  h-10 mr-5 w-20"
            >
              Hủy
            </button>
            <button  onClick={handleDelete} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md h-10 w-24">
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteFlowModal;
