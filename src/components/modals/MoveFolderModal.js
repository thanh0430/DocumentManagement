import React from "react";
import { FcFolder } from "react-icons/fc";
export default function MoveFolderModal({ folder, onClose }) {
  const handleCancel = () => {
    console.log("Cancel button clicked");
    onClose();
  };
  return (
    <div className="justify-center items-center flex fixed inset-0 bg-opacity-30 backdrop-blur-sm ">
      <div className="border rounded-lg border-gray-300 p-4 bg-white">
        <div className="text-left">
          <p className="text-xl font-normal">
            Di chuyển thư mục: "{folder.name}"
          </p>
          <p className=" mt-3 font-normal text-lg">Đề xuất </p>
          <hr />
          <p className=" mt-3 font-normal text-lg flex gap-4">
            {" "}
            <FcFolder fontSize={40} /> <p className="mt-2">Công khai </p>
          </p>
          <p className=" mt-3 font-normal text-lg flex gap-4">
            {" "}
            <FcFolder fontSize={40} /> <p className="mt-2">Bảo mật </p>
          </p>
          <p className=" mt-3 font-normal text-lg flex gap-4">
            {" "}
            <FcFolder fontSize={40} /> <p className="mt-2">Tuyệt mật </p>
          </p>
        </div>
        <form className="w-96 ">
          <div className="flex justify-end mt-28">
            <button
              onClick={handleCancel}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md h-10 mr-5 w-20"
            >
              Hủy
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md h-10 w-24">
              Di chuyển
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
