import React from 'react';
import { FcFolder } from "react-icons/fc";
import { HiDotsVertical } from "react-icons/hi";
import useFolderService from '../hooks/useFolderService';
import CreateFolderModal from'../modals/CreateFolderModal'
import { useState } from 'react'

const FolderPage = () => {
  const { folders, loading, error, fetchFolders, deleteFolder } = useFolderService();
  const [showModal, setShowModal] = useState(false);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // const handleDeleteFolder = async (folderId) => {
  //   try {
  //     await deleteFolder(folderId);
  //   } catch (error) {
  //     console.error('Error deleting folder:', error);
  //   }
  // };
  const openAddModal = () => {
    setShowModal(true);
  };
  return (
    <div className="container flex  mx-auto">
      <div className="flex flex-col">
        <div className="w-full">
        <div className="flex justify-end space-x-4 p-2">
          <div className="flex items-center  h-10 rounded-lg shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Tìm kiếm theo tên thư mục"
            />
          </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md h-10">
              Tìm kiếm
            </button>       
            <button onClick={openAddModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md h-10">
              Tạo thư mục
            </button>
            {showModal && <CreateFolderModal onClose={() => setShowModal(false)}/>}
        </div>
          <div className=" border-gray-200 shadow mt-3">
            <table className="divide-y">
              <thead className="">
                <tr> 
                  <th className="  px-6 py-2 text-xs text-gray-500 w-96 text-left">
                    Tên thư mục
                  </th>
                  <th className=" p-2 px-6 py-2 text-xs text-gray-500 w-80 text-left">
                   Người Tạo
                  </th>
                  <th className="  p-2 px-6 py-2 text-xs text-gray-500 w-60 text-left">
                    Ngày Tạo 
                  </th>
                  <th className=" p-2 px-6 py-2 text-xs text-gray-500 w-60 ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {folders.map((folder, index) => (
                  <tr key={index} className="whitespace-nowrap">
                    <td className=" p-2 px-6 py-4 text-sm text-gray-900 flex ">
                        <FcFolder fontSize={20}/>                   
                      <div className='ml-5 '>{folder.name}</div>
                    </td>
                    <td className=" p-2 px-6 py-4">
                      <div className="text-sm text-gray-900">{folder.userName}</div>
                    </td>
                    <td className=" p-2 px-6 py-4">
                      <div className="text-sm text-gray-900">{folder.createDate.slice(0, 10)}</div>
                    </td>
                    <td className="p-2 px-6 py-4">
                    <div className="text-sm text-gray-900 flex justify-center items-center">
                      <HiDotsVertical />
                    </div>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>          
          </div>
        </div>
      </div>
      {/* <h2>Folder List</h2>
      <ul>
        {folders.map((folder) => (
          <li key={folder.id}>
            {folder.name}
            <button onClick={() => handleDeleteFolder(folder.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={fetchFolders}>Refresh Folders</button> */}
    </div>
  );
};

export default FolderPage;
