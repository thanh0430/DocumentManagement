import React, { useState, useEffect } from 'react';
import useFolderService from '../../hooks/UseFolderService';
import { showAlert, showErrorAlert } from '../shared/Notification';

export default function CreateFolderModal({ onClose, isAdding, folder }) {
  const [inputValue, setInputValue] = useState({ name: '' });
  const { createFolder, editFolder } = useFolderService();

  useEffect(() => {
    if (folder) {
      setInputValue({ name: folder.name });
    }
  }, [folder]);

  const onChangeInput = (event) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const addFolder = async (event) => {
    event.preventDefault();
    try {
      const folderData = {
        name: inputValue.name,
        userId: 1,
      };

      const result = await createFolder(folderData);
      if (result.statusCode === 201) {
        showAlert(result.message);
        onClose();
      } else {
        showErrorAlert(result.message);
      }
    } catch (error) {
      showErrorAlert(error.message);
    }
  };

  const updateFolder = async (event) => {
    event.preventDefault();
    try {
      const currentUserId = 1;
      const result = await editFolder(folder.id, inputValue.name, currentUserId);
      if (result.statusCode === 204) {
        showAlert(result.message);
        onClose(); // Close the modal after successful update
      } else {
        showErrorAlert(result.message);
      }
    } catch (error) {
      showErrorAlert(error.message);
    }
  };

  return (
    <div className='justify-center items-center flex fixed inset-0 bg-opacity-30 backdrop-blur-sm'>
      <div className="border rounded-lg border-gray-300 p-4 bg-white">
        <form className="w-96 max-w-lg">
          <div className="">
            <div className="w-full">
              <label className="text-left block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-first-name">
                Tên thư mục:
              </label>
              <input
                className="font-normal w-full bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="name"
                value={inputValue.name}
                onChange={onChangeInput}
              />
            </div>
          </div>
          <div className='flex justify-end mt-10'>
            <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded h-10 mr-5">
              Hủy
            </button>
            {isAdding ? (
              <button onClick={addFolder} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md h-10">
                THÊM MỚI
              </button>
            ) : (
              <button onClick={updateFolder} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md h-10">
                CẬP NHẬT
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
