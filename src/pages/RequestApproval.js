import React, { useState, useMemo } from "react";
import CreateRequestModal from "../modals/CreateRequestModal";
import DeleteRequestModal from "../modals/DeleteRequestModal";
import UseRequestService from "../hooks/UseRequestService";
import { AiFillEye } from "react-icons/ai";
import Approval from "../modals/Approval";

const RequestApproval = ({ userId }) => {
  const { requests } = UseRequestService(userId);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const openAddModal = () => {
    setCurrentRequest(null);
    setShowModal(true);
  };

  const openApprovalAddModal = (request) => {
    setCurrentRequest(request);
    setShowApprovalModal(true);
  };

  const handleSearch = () => {
    console.log(`Tìm kiếm: ${searchTerm}`);
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesSearchTerm =
        (request.name &&
          request.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (request.title &&
          request.title.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus =
        filterStatus === "" ||
        (filterStatus === "approved" &&
          request.approvalSteps[0]?.status === 2) ||
        (filterStatus === "pending" && request.approvalSteps[0]?.status === 1);

      return matchesSearchTerm && matchesStatus;
    });
  }, [requests, searchTerm, filterStatus]);

  const totalRequests = filteredRequests.length;
  const totalPages = Math.ceil(totalRequests / itemsPerPage);

  // Lọc các yêu cầu dựa trên trang hiện tại
  const currentRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredRequests.slice(startIndex, endIndex);
  }, [filteredRequests, currentPage]);

  const approvedRequests = filteredRequests.filter(
    (request) =>
      request.approvalSteps.length > 0 && request.approvalSteps[0].status === 2
  ).length;
  const pendingRequests = totalRequests - approvedRequests;

  // Xử lý sự kiện chuyển trang
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="relative overflow-x-auto p-5 bg-gray-100 rounded-lg shadow-lg">
       {showModal && (
      <CreateRequestModal
        onClose={() => setShowModal(false)}
        isAdding={currentRequest === null} 
        currentRequest={currentRequest} 
      />
    )}
      {showModalDelete && (
        <DeleteRequestModal onClose={() => setShowModalDelete(false)} />
      )}
      {showApprovalModal && (
        <Approval
          onClose={() => setShowApprovalModal(false)}
          currentRequest={currentRequest}
        />
      )}

      {/* Thêm yêu cầu */}
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={openAddModal}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Thêm yêu cầu
        </button>

        {/* Thanh tìm kiếm với nút */}
        <div className="flex items-center w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm yêu cầu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-5"
          >
            Tìm kiếm
          </button>
        </div>

        {/* Bộ lọc trạng thái */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chưa phê duyệt</option>
          <option value="approved">Đã phê duyệt</option>
        </select>
      </div>

      {/* Thống kê */}
      <div className="flex gap-5 mb-5">
        <div className="bg-white p-5 rounded-lg shadow-md w-1/3 text-center">
          <p className="text-lg font-semibold text-gray-700">Tổng số yêu cầu</p>
          <p className="text-2xl font-bold text-blue-600">{totalRequests}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md w-1/3 text-center">
          <p className="text-lg font-semibold text-gray-700">Đã phê duyệt</p>
          <p className="text-2xl font-bold text-green-600">
            {approvedRequests}
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md w-1/3 text-center">
          <p className="text-lg font-semibold text-gray-700">Chưa phê duyệt</p>
          <p className="text-2xl font-bold text-red-600">{pendingRequests}</p>
        </div>
      </div>

      {/* Bảng yêu cầu */}
      <table className="min-w-full text-sm text-left text-gray-500 bg-white shadow-md rounded-lg">
        <thead className="bg-blue-100">
          <tr className="border-b text-base">
            <th scope="col" className="px-6 py-3 font-medium text-gray-700">
              Người tạo
            </th>
            <th scope="col" className="px-6 py-3 font-medium text-gray-700">
              Tiêu đề
            </th>
            <th scope="col" className="px-6 py-3 font-medium text-gray-700">
              Ngày tạo
            </th>
            <th scope="col" className="px-6 py-3 font-medium text-gray-700">
              Ngày phê duyệt
            </th>
            <th scope="col" className="px-6 py-3 font-medium text-gray-700">
              Trạng thái
            </th>
            <th scope="col" className="px-6 py-3 font-medium text-gray-700">
              Xem
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.length > 0 ? (
            currentRequests.map((request) => (
              <tr
                key={request.id}
                className="bg-white border-b hover:bg-gray-100"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {request.userName}
                </td>
                <td className="px-6 py-4 text-gray-900">{request.title}</td>
                <td className="px-6 py-4 text-gray-900">
                  {request.createdDate?.slice(0, 10)}
                </td>
                <td className="px-6 py-4 text-gray-900">
                  {request.approvalSteps[0]?.updateTime?.slice(0, 10)}
                </td>
                <td className="px-6 py-4 text-gray-900">
                  {request.approvalSteps.length > 0
                    ? request.approvalSteps[0].status === 1
                      ? "Chưa phê duyệt"
                      : request.approvalSteps[0].status === 2
                      ? "Đã phê duyệt"
                      : request.approvalSteps[0].status === 3
                      ? "Hủy phê duyệt"
                      : "Trạng thái không xác định"
                    : "Không có bước phê duyệt"}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="mr-7"
                    onClick={() => openApprovalAddModal(request)}
                  >
                    <AiFillEye fontSize={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                Không có dữ liệu
              </td>
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
            {Math.min(currentPage * itemsPerPage, totalRequests)} of{" "}
            {totalRequests} entries
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
};

export default RequestApproval;
