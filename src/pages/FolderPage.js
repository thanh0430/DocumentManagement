import React, { useState } from "react";
import { FcFolder } from "react-icons/fc";
import { HiDotsVertical } from "react-icons/hi";
import useFolderService from "../hooks/UseFolderService";
import CreateFolderModal from "../components/modals/CreateFolderModal";
import ActionModal from "../components/modals/ActionModal";
import { Link } from "react-router-dom";

const FolderPage = () => {
  const currentUserId =1; // Thay thế giá trị này với userId thực tế khi có
  const { folders, loading, error, fetchFolders, searchFolders } = useFolderService(currentUserId);
  const [showModal, setShowModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [inputValue, setInputValue] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const openAddModal = () => {
    setShowModal(true);
    setIsAdding(true);
  };

  const openActionModal = (folder) => {
    setSelectedFolder(folder);
    setShowActionModal(true);
  };

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = async () => {
    if (inputValue.trim() === "") {
      return;
    }
    await searchFolders(inputValue);
  };

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
                placeholder="Tìm kiếm theo tên thư mục"
                value={inputValue}
                onChange={onChangeInput}
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Tìm kiếm
            </button>
            <button
              onClick={openAddModal}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Tạo thư mục
            </button>
            {showModal && (
              <CreateFolderModal
                onClose={() => setShowModal(false)}
                isAdding={isAdding}
                setIsAdding={setIsAdding}
                fetchFolders={() => fetchFolders(currentUserId)}
              />
            )}
          </div>
          <div className="border-gray-100">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-200">
                <tr className="text-base">
                  <th className="px-6 py-2 font-medium text-gray-700 w-96 text-left">
                    Tên thư mục
                  </th>
                  <th className="p-2 px-6 py-2 font-medium text-gray-700 w-80 text-left">
                    Người Tạo
                  </th>
                  <th className="p-2 px-6 py-2 font-medium text-gray-700 w-60 text-left">
                    Ngày Tạo
                  </th>
                  <th className="p-2 px-6 py-2 font-medium text-gray-700 w-60">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {folders.map((folder, index) => (
                  <tr key={index} className="whitespace-nowrap">
                    <td className="p-2 px-6 py-4 text-sm text-gray-900 flex">
                      <Link
                        to={`/filepage/${folder.id}`}
                        className="flex items-center"
                      >
                        <FcFolder fontSize={20} />
                        <div className="ml-5">{folder.name}</div>
                      </Link>
                    </td>
                    <td className="p-2 px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {folder.userName}
                      </div>
                    </td>
                    <td className="p-2 px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {folder.createDate.slice(0, 10)}
                      </div>
                    </td>
                    <td className="p-2 px-6 py-4">
                      <div className="text-sm text-gray-900 flex justify-center items-center relative">
                        <HiDotsVertical
                          onClick={() => openActionModal(folder)}
                        />
                        {showActionModal && selectedFolder?.id === folder.id && (
                          <ActionModal
                            folder={selectedFolder}
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

export default FolderPage;
