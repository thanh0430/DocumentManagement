import React, { useRef, useEffect, useState } from "react";
import { FaUserPlus, FaPencil } from "react-icons/fa6";
import { MdDriveFileMove, MdDownload, MdDelete } from "react-icons/md";
import DeleteFolderModal from "./DeleteFolderModal";
import CreateFolderModal from "./CreateFolderModal";
import MoveFolderModal from "./MoveFolderModal";
import { useLocation } from "react-router-dom";
import ShareFolderModal from "./ShareFolderModal";

export default function ActionModal({ folder, onClose }) {
  const modalRef = useRef();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const location = useLocation();
  const showMoveButton = !location.pathname.includes("/Document");

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

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const openEditModal = () => {
    setShowEditModal(true);
  };
  const openMoveModal = () => {
    setShowMoveModal(true);
  };
  const openShareModal = () => {
    setShowShareModal(true);
  };

  return (
    <div
      ref={modalRef}
      className="absolute top-1 bg-white p-2 border rounded-lg shadow-lg mr-56"
    >
      <div className="flex flex-col mt-2 w-44">
        <button
          onClick={openShareModal}
          className="font-bold py-2 px-4 rounded mb-2 flex"
        >
          <FaUserPlus fontSize={18} className="mr-2" /> Chia sẻ
        </button>
        {showShareModal && (
          <ShareFolderModal
            folder={folder}
            onClose={() => setShowShareModal(false)}
          />
        )}

        {showMoveButton && (
          <button
            onClick={openMoveModal}
            className="font-bold py-2 px-4 rounded mb-2 flex"
          >
            <MdDriveFileMove fontSize={18} className="mr-2" /> Di chuyển
          </button>
        )}
        {showMoveModal && (
          <MoveFolderModal
            folder={folder}
            onClose={() => setShowMoveModal(false)}
          />
        )}
        <button className="font-bold py-2 px-4 rounded mb-2 flex">
          <MdDownload fontSize={18} className="mr-2" /> Download
        </button>
        <button
          onClick={openEditModal}
          className="font-bold py-2 px-4 rounded mb-2 flex"
        >
          <FaPencil fontSize={18} className="mr-2" /> Chỉnh sửa
        </button>
        {showEditModal && (
          <CreateFolderModal
            folder={folder}
            onClose={() => setShowEditModal(false)}
          />
        )}
        <button
          onClick={openDeleteModal}
          className="font-bold py-2 px-4 rounded mb-2 flex"
        >
          <MdDelete fontSize={18} className="mr-2" /> Xóa
        </button>
        {showDeleteModal && (
          <DeleteFolderModal
            folder={folder}
            onClose={() => setShowDeleteModal(false)}
          />
        )}
      </div>
    </div>
  );
}
