import React from "react";

export default function CreateFolderModal({onClose}) {
  return (
    <div className="justify-center items-center flex fixed inset-0 bg-opacity-30 backdrop-blur-sm ">
      <div className="border rounded-lg border-gray-300 p-4 bg-white">
        <form className="w-96 max-w-lg">
          <div className="">
            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Tên thư mục:
              </label>
              <input
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="producttype"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-10 w-20"
            >
              Hủy
            </button>
            <button className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-10 ml-5">
              THÊM MỚI
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
