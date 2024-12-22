import React, { useState, useEffect, useMemo } from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import CreateRole from "../modals/CreateRole";
import UseRoleService from "../hooks/UseRoleService";
import DeleteRoleModal from "../modals/DeleteRoleModal";

export default function Role() {
  const { roles, loading, error } = UseRoleService();
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [currentRole, setCurrentRole] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [currentRoleId, setCurrentRoleId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const openAddModal = () => {
    setShowModal(true);
    setIsAdding(true);
    setCurrentRole(null); // Reset current role khi thêm mới
  };

  const openEdit = (role) => {
    setShowModal(true);
    setIsAdding(false);
    setCurrentRole(role); // Đặt role hiện tại cho chỉnh sửa
  };

  const openDelete = (roleId) => {
    setCurrentRoleId(roleId);
    setShowModalDelete(true);
  };

  // Tính toán tổng số roles để phân trang
  const totalRoles = roles.length;
  const totalPages = Math.ceil(totalRoles / itemsPerPage);

  // Lọc các roles dựa trên trang hiện tại
  const currentRoles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return roles.slice(startIndex, endIndex);
  }, [roles, currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-red-500">{error.message}</div>;

  return (
    <div className="relative overflow-x-auto p-5 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex float-end">
        <form className="flex items-center max-w-sm mr-auto mb-5">
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <input
              type="text"
              id="simple-search"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Tìm kiếm..."
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
        <div className="float-end mb-5 mr-5 ml-10">
          <button
            onClick={openAddModal} // Mở modal thêm mới
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Thêm chức vụ
          </button>
          {showModal && (
            <CreateRole
              onClose={() => setShowModal(false)}
              isAdding={isAdding}
              role={currentRole} // Truyền role hiện tại vào modal
            />
          )}
          {showModalDelete && (
            <DeleteRoleModal
              onClose={() => setShowModalDelete(false)}
              roleId={currentRoleId}
            />
          )}
        </div>
      </div>

      {/* Bảng danh sách chức vụ */}
      <table className="min-w-full text-sm text-left text-gray-500">
        <thead className="bg-gray-200">
          <tr className="border-b text-base">
            <th className="px-6 py-3 font-medium text-gray-700">ID</th>
            <th className="px-6 py-3 font-medium text-gray-700">Chức vụ</th>
            <th className="px-6 py-3 font-medium text-gray-700">Chú thích</th>
            <th className="px-6 py-3 font-medium text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRoles.length > 0 ? (
            currentRoles.map((role) => (
              <tr key={role.id} className="bg-white border-b text-gray-900">
                <td className="px-6 py-4 font-medium text-gray-900">{role.id}</td>
                <td className="px-6 py-4">{role.roleName}</td>
                <td className="px-6 py-4">{role.description}</td>
                <td className="px-6 py-4">
                  <button className="mr-7" onClick={() => openEdit(role)}>
                    <GrEdit fontSize={20} />
                  </button>
                  <button onClick={() => openDelete(role.id)}>
                    <RiDeleteBin6Line fontSize={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="flex flex-col lg:flex-row justify-between mt-5">
        <div className="flex flex-col lg:flex-row items-center space-x-2 text-xs">
          <button className="py-2 px-4 bg-white text-gray-600 font-medium rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center">
            {itemsPerPage} items
          </button>

          <p className="text-gray-500 mt-4 lg:mt-0">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalRoles)} of{" "}
            {totalRoles} entries
          </p>
        </div>

        <nav
          aria-label="Pagination"
          className="flex justify-center items-center text-gray-600 mt-8 lg:mt-0"
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 mr-4 rounded hover:bg-gray-100 disabled:opacity-50"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 ml-4 rounded hover:bg-gray-100 disabled:opacity-50"
          >
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
}
