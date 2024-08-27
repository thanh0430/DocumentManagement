import React from "react";
import { useState } from "react";
import CreateFlowModal from "../modals/CreateFlowModal";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteFlowModal from "../modals/DeleteFlowModal";
import useFlowService from "../hooks/useFlowService";
function ApprovalFlow() {
  const { Flows } = useFlowService();
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [title, setTitle] = useState(true);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [currentFlow, setCurrentFlow] = useState(null); // State để lưu dữ liệu luồng hiện tại

  const openAddModal = () => {
    setShowModal(true);
    setIsAdding(true); //Hàm để cập nhật trạng thái isAdding.
    setTitle(true);
    setCurrentFlow(null);
  };
  const openEdit = (flow) => {
    setShowModal(true);
    setIsAdding(false);
    setTitle(false);
    setCurrentFlow(flow)
  };

  const openDelete = () => {
    setShowModalDelete(true);
  };

  return (
    <div className="relative overflow-x-auto">
      {showModal && (
        <CreateFlowModal
          onClose={() => setShowModal(false)}
          isAdding={isAdding}
          title={title}
          Flows={currentFlow} // Truyền dữ liệu luồng phê duyệt hiện tại vào modal
        />
      )}
      {showModalDelete && (
        <DeleteFlowModal onClose={() => setShowModalDelete(false)} />
      )}
      <div className="flex float-end">
        <form class="flex items-center max-w-sm mr-auto mb-5">
          <label for="simple-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full">
            <input
              type="text"
              id="simple-search"
              class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Tìm kiếm..."
              required
            />
          </div>
          <button
            type="submit"
            class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </form>

        <div className="float-end mb-5 mr-5 ml-10">
          <button
            onClick={openAddModal}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Thêm luồng
          </button>
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="border-b">
            <th scope="col" className="px-6 py-3">
              Tên luồng
            </th>
            <th scope="col" className="px-6 py-3">
              Ngày tạo
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {Flows.map((flows, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {flows.name}
              </th>
              <td className="px-6 py-4"> {flows.createdDate.slice(0, 10)}</td>
              <td className="px-6 py-4">
                <button className="mr-7" onClick={() => openEdit(flows)}>
                  <GrEdit fontSize={20} />
                </button>
                <button onClick={() => openDelete()}>
                  <RiDeleteBin6Line fontSize={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApprovalFlow;
