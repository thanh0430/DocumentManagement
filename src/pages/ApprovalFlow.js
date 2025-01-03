import { useState, useEffect, useMemo } from "react";
import CreateFlowModal from "../modals/CreateFlowModal";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteFlowModal from "../modals/DeleteFlowModal";
import useFlowService from "../hooks/useFlowService";

const ApprovalFlow = () => {
  const { flows, loading, error } = useFlowService();
  const [filteredFlows, setFilteredFlows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [currentFlow, setCurrentFlow] = useState(null);
  const [currentFlowId, setCurrentFlowId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setFilteredFlows(flows);
    console.log("Updated Flows:", flows);
  }, [flows]);

  const openAddModal = () => {
    setShowModal(true);
    setIsAdding(true);
    setCurrentFlow(null);
  };

  const openEdit = (flow) => {
    setShowModal(true);
    setIsAdding(false);
    setCurrentFlow(flow);
  };

  const openDelete = (flowId) => {
    setCurrentFlowId(flowId);
    setShowModalDelete(true);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === "") {
      setFilteredFlows(flows);
    } else {
      setFilteredFlows(
        flows.filter((flow) =>
          flow.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const totalRequests = filteredFlows.length;
  const totalPages = Math.ceil(totalRequests / itemsPerPage);

  // Lọc các yêu cầu dựa trên trang hiện tại
  const currentRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredFlows.slice(startIndex, endIndex);
  }, [filteredFlows, currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-red-500">{error.message}</div>;

  return (
    <div className="relative overflow-x-auto p-5 bg-gray-100 rounded-lg shadow-lg">
      {/* Thống kê sản phẩm */}
      <div className="bg-blue-100 p-4 mb-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">Thống kê luồng</h2>
        <p>Tổng số luồng hiện tại: {filteredFlows.length}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between mb-5">
        {/* Bộ lọc sản phẩm */}
        <div className="w-full md:w-1/2 flex items-center mb-4 md:mb-0">
          <input
            type="text"
            id="simple-search"
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="Tìm kiếm luồng..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            onClick={() => setSearchTerm("") || setFilteredFlows(flows)}
            className="p-2.5 ms-2 text-sm font-medium text-white bg-slate-600 rounded-lg border border-indigo-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-red-300 w-40"
          >
            tìm kiếm
          </button>
        </div>
        {/* Nút thêm luồng */}
        <div className="float-end">
          <button
            onClick={openAddModal}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Thêm luồng
          </button>
          {showModal && (
            <CreateFlowModal
              onClose={() => setShowModal(false)}
              isAdding={isAdding}
              setIsAdding={setIsAdding}
              Flows={currentFlow}
            />
          )}
          {showModalDelete && (
            <DeleteFlowModal
              onClose={() => setShowModalDelete(false)}
              flowId={currentFlowId}
            />
          )}
        </div>
      </div>

      {/* Danh sách sản phẩm dưới dạng bảng */}
      <table className="min-w-full text-sm text-left text-gray-500">
        <thead className="bg-gray-200">
          <tr className="border-b text-base">
            <th scope="col" className="px-6 py-3 font-medium text-gray-700">
              Tên luồng
            </th>
            <th scope="col" className="px-6 py-3 font-medium text-gray-700">
              Ngày tạo
            </th>
            <th scope="col" className="px-6 py-3 font-medium text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRequests.length > 0 ? (
            currentRequests.map((flow) => (
              <tr key={flow.id} className="bg-white border-b text-gray-900">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {flow.name}
                </td>
                <td className="px-6 py-4">{flow.createdDate.slice(0, 10)}</td>
                <td className="px-6 py-4">
                  <button className="mr-7" onClick={() => openEdit(flow)}>
                    <GrEdit fontSize={20} />
                  </button>
                  <button onClick={() => openDelete(flow.id)}>
                    <RiDeleteBin6Line fontSize={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
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

export default ApprovalFlow;
