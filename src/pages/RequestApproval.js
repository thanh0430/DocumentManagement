import React from "react";
import CreateRequestModal from "../modals/CreateRequestModal";
import DeleteRequestModal from "../modals/DeleteRequestModal";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
const RequestApproval = () => {
    const [showModal, setShowModal] = useState(false);

    const [showModalDelete, setShowModalDelete] = useState(false);

    const openAddModal = () => {
        setShowModal(true);
      
      };
      const openEdit = () => {
        setShowModal(true);
    
      };
    
      const openDelete = () => {
        setShowModalDelete(true);
      };
    
  return (
    <div className="relative overflow-x-auto">
      {showModal && (
        <CreateRequestModal
          onClose={() => setShowModal(false)}
       
        />
      )}
      {showModalDelete && (
        <DeleteRequestModal onClose={() => setShowModalDelete(false)} />
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
            Thêm yêu cầu
          </button>
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="border-b">
            <th scope="col" className="px-6 py-3">
              Người tạo
            </th>
            <th scope="col" className="px-6 py-3">
              Tiêu đề
            </th>
            <th scope="col" className="px-6 py-3">
              Ngày tạo
            </th>
            <th scope="col" className="px-6 py-3">
              Ngày phê duyệt
            </th>
            <th scope="col" className="px-6 py-3">
              Trạng thái
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td >Văn A</td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Xin nghỉ phép
            </th>
            <td className="px-6 py-4">20/4/2024</td>
            <td className="px-6 py-4">21/4/2024</td>
            <td className="px-6 py-4">Active</td>
            <td className="px-6 py-4">
              <button className="mr-7" onClick={() => openEdit()}>
                <GrEdit fontSize={20} />
              </button>
              <button onClick={() => openDelete()}>
                <RiDeleteBin6Line fontSize={20} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RequestApproval;
