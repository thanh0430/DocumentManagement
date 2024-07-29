import React, { useRef, useEffect, useState } from "react";
import useFolderService from '../../hooks/UseFolderService';
import { showAlert, showErrorAlert } from '../shared/Notification';

export default function ShareFolderModal({ folder, onClose }) {
  const modalRef = useRef();
  const [inputValue, setInputValue] = useState("");
  const [emailValue, setEmailValue] = useState(""); 
  const { shareFolder } = useFolderService();

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const onChangeInput = (event) => {
    setInputValue(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmailValue(event.target.value);
  };

  const handleShare = async () => {
    const permissionsMap = {
      "Edit, view, Delete, Create": ["Edit", "View", "Delete", "Create"],
      "View": ["View"]
    };
  
    const selectedPermissions = permissionsMap[inputValue] || [];
  
    const folderPermissions = selectedPermissions.map(permission => ({
      userId: 2, // Thay thế bằng ID người dùng thực tế nếu cần
      folderId: folder.id,
      name: permission
    }));
  
    try {
      const result = await shareFolder(folderPermissions); 
      if (result.statusCode === 201) {
        showAlert("Chia sẻ thư mục thành công.");
        onClose();
      } else {
        showErrorAlert(result.message);
      }
    } catch (error) {
      showErrorAlert(error.message);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white p-4 rounded-lg shadow-lg w-2/4">
        <h2 className="text-xl mb-4">Chia sẻ thư mục: "{folder.name}"</h2>
        <div>
          <input
            type="email"
            placeholder="Thêm người, nhóm cần chia sẻ"
            className="border p-2 rounded w-3/5 mb-4"
            value={emailValue}
            onChange={onChangeEmail}
          />
          <select
            id="countries"
            className="border p-2 w-2/6 ml-11"
            onChange={onChangeInput}
            value={inputValue}
            name="name"
          >
            <option value="">Chọn quyền truy cập</option>
            <option value="View">Người xem</option>
            <option value="Edit, view, Delete, Create">Người xem và chỉnh sửa</option>
          </select>
        </div>

        <div className="flex justify-end gap-10 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleShare}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Chia sẻ
          </button>
        </div>
      </div>
    </div>
  );
}
