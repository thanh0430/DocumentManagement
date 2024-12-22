import React, { useState, useEffect, useMemo } from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import CreateCustmes from "../modals/CreateCustmes";
import UseCustomerService from "../hooks/UseCustomerService";
import DeleteCustomer from "../modals/DeleteCustomer";

export default function Customers() {
  const { customers, loading, error } = UseCustomerService();
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const openAddModal = () => {
    setShowModal(true);
    setIsAdding(true);
    setCurrentCustomer(null); // Reset current customer khi thêm mới
  };

  const openEdit = (customer) => {
    setShowModal(true);
    setIsAdding(false);
    setCurrentCustomer(customer); // Đặt customer hiện tại cho chỉnh sửa
  };

  const openDelete = (customerId) => {
    setCurrentCustomerId(customerId);
    setShowModalDelete(true);
  };

  // Tính toán tổng số khách hàng để phân trang
  const totalCustomers = customers.length;
  const totalPages = Math.ceil(totalCustomers / itemsPerPage);

  // Lọc các khách hàng dựa trên trang hiện tại
  const currentCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return customers.slice(startIndex, endIndex);
  }, [customers, currentPage]);

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
            Thêm nhân viên
          </button>
          {showModal && (
            <CreateCustmes
              onClose={() => setShowModal(false)}
              isAdding={isAdding}
              customer={currentCustomer} // Truyền customer hiện tại vào modal
            />
          )}
          {showModalDelete && (
            <DeleteCustomer
              onClose={() => setShowModalDelete(false)}
              customerId={currentCustomerId}
            />
          )}
        </div>
      </div>

      {/* Bảng danh sách nhân viên */}
      <table className="min-w-full text-sm text-left text-gray-500">
        <thead className="bg-gray-200">
          <tr className="border-b text-base">
            <th className="px-6 py-3 font-medium text-gray-700">ID</th>
            <th className="px-6 py-3 font-medium text-gray-700">Họ</th>
            <th className="px-6 py-3 font-medium text-gray-700">Tên</th>
            <th className="px-6 py-3 font-medium text-gray-700">Địa Chỉ</th>
            <th className="px-6 py-3 font-medium text-gray-700">Email</th>
            <th className="px-6 py-3 font-medium text-gray-700">Giới tính</th>
            <th className="px-6 py-3 font-medium text-gray-700">Phân quyền</th>
            <th className="px-6 py-3 font-medium text-gray-700">Phòng ban</th>
            <th className="px-6 py-3 font-medium text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.length > 0 ? (
            currentCustomers.map((customer) => (
              <tr key={customer.id} className="bg-white border-b text-gray-900">
                <td className="px-6 py-4 font-medium text-gray-900">{customer.id}</td>
                <td className="px-6 py-4">{customer.firstName}</td>
                <td className="px-6 py-4">{customer.lastName}</td>
                <td className="px-6 py-4">{customer.address}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.gender}</td>
                <td className="px-6 py-4">{customer.roleName}</td>
                <td className="px-6 py-4">{customer.departmentName}</td>
                <td className="px-6 py-4">
                  <button className="mr-7" onClick={() => openEdit(customer)}>
                    <GrEdit fontSize={20} />
                  </button>
                  <button onClick={() => openDelete(customer.id)}>
                    <RiDeleteBin6Line fontSize={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">Không có dữ liệu</td>
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
            {Math.min(currentPage * itemsPerPage, totalCustomers)} of{" "}
            {totalCustomers} entries
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
