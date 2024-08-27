import React, { useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useParams } from "react-router-dom";
import useFileService from "../hooks/UseFileService";
import ActionModal from "../components/modals/ActionModal";
import { GoFileDirectoryFill } from "react-icons/go";
import { useState } from "react";
import CreateFileModal from "../components/modals/CreateFileModal";
import { IoMdCloudUpload } from "react-icons/io";

const FilePage = () => {
  const currentUserId =1;
  const { folderId } = useParams();
  const { files, loading, error,fetchFiles } = useFileService(folderId, currentUserId);
  const [showModal, setShowModal] = useState(false);
 
  const [showActionModal, setShowActionModal] = useState(false);
  const openActionModal = (file) => {
    setShowActionModal(file);
  };
  const openAddModal = (folder) => {
    setShowModal(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container flex mx-auto">
      <div className="flex flex-col">
        <div className="w-full">
          <div className="flex justify-end space-x-4 p-2">
            <div className="flex items-center h-10 rounded-lg shadow-lg bg-white overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                placeholder="Tìm kiếm theo tên file"
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md h-10">
              Tìm kiếm
            </button>
            <button
              onClick={openAddModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md h-10 flex"
            >
              Tải tệp <IoMdCloudUpload fontSize={18} className="m-1"/>
            </button>
            {showModal && (
              <CreateFileModal
                onClose={() => setShowModal(false)}
                fetchFiles={() => fetchFiles(currentUserId)}
              />
            )}
          </div>
          <div className="border-gray-200 shadow mt-3">
            <table className="divide-y">
              <thead>
                <tr>
                  <th className="px-6 py-2 text-xs text-gray-500 w-96 text-left">
                    Tên file
                  </th>
                  <th className="p-2 px-6 py-2 text-xs text-gray-500 w-80 text-left">
                    Người Tạo
                  </th>
                  <th className="p-2 px-6 py-2 text-xs text-gray-500 w-60 text-left">
                    Ngày Tạo
                  </th>
                  <th className="p-2 px-6 py-2 text-xs text-gray-500 w-60 text-left">
                    Dung lượng
                  </th>
                  <th className="p-2 px-6 py-2 text-xs text-gray-500 w-60">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {files.map((file, index) => (
                  <tr key={index} className="whitespace-nowrap">
                    <td className="p-2 px-6 py-4 text-sm text-gray-900 flex">
                      <GoFileDirectoryFill fontSize={20} />
                      <div className="ml-5">{file.name}</div>
                    </td>
                    <td className="p-2 px-6 py-4">
                      <div className="text-sm text-gray-900">{file.userName}</div>
                    </td>
                    <td className="p-2 px-6 py-4">
                      <div className="text-sm text-gray-900">{file.createdDate.slice(0, 10)}</div>
                    </td>
                    <td className="p-2 px-6 py-4">
                    {file.fileSize.toFixed(2)} MB
                    </td>
                    <td className="p-2 px-6 py-4">
                      <div className="text-sm text-gray-900 flex justify-center items-center relative">
                        <HiDotsVertical onClick={() => openActionModal(file)} />
                        {showActionModal && showActionModal.id === file.id && (
                          <ActionModal
                            file={showActionModal}
                            onClose={() => setShowActionModal(false)}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePage;
