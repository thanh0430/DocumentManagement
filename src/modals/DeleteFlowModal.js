import React from "react";
const DeleteFlowModal = ({ onClose }) => {
  return (
    <div className="justify-center items-center flex fixed inset-0 bg-opacity-30 backdrop-blur-sm ">
      <div className="border rounded-lg border-gray-300 p-4 bg-white">
        <form className="w-96 max-w-lg">
          <p className="text-red-500 mt-3 font-normal text-lg pb-14 text-center">
            Bạn có chắc chắn muốn xóa ?{" "}
          </p>
          <div className="flex float-end ">
            <div>
              <button
                onClick={onClose}
                className="bg-muted text-muted-foreground px-4 py-2 rounded-md bg-gray-300 text-white mr-4 hover:bg-gray-400"
              >
                Hủy
              </button>
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">
             Xóa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteFlowModal;
