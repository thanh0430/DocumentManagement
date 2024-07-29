import React from "react";
import useFolderService from '../../hooks/UseFolderService';
import { showAlert, showErrorAlert } from '../shared/Notification';

export default function DeleteFolderModal({ folder, onClose }) {
  const { deleteFolder  } = useFolderService();
  const handleCancel = () => {
    console.log("Cancel button clicked");
    onClose();
  };
  const DeleteFolder = async (event) => {
    event.preventDefault();
      const currentUserId = 1;     
      const result = await deleteFolder(folder.id,  currentUserId);
      if (result.statusCode === 204) {
        showAlert(result.message); 
          
      } else {
        showErrorAlert(result.message);
      }   
  };
  return (
    <div className="justify-center items-center flex fixed inset-0 bg-opacity-30 backdrop-blur-sm ">
      <div className="border rounded-lg border-gray-300 p-4 bg-white">
        <div className="text-left">
          <p className="text-xl font-normal">Tên thư mục: "{folder.name}"</p>
          <p className="text-red-500 mt-3 font-normal text-lg">
            Bạn có chắc chắn muốn xóa ?{" "}
          </p>
        </div>
        <form className="w-96 ">
          <div className="flex justify-end mt-28">
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded  h-10 mr-5 w-20"
            >
              Hủy
            </button>
            <button  onClick={DeleteFolder} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md h-10 w-24">
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
