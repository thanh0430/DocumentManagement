import React, { useState, useEffect } from "react";
import UseRoleService from "../hooks/UseRoleService";
import { showAlert, showErrorAlert } from "../components/shared/Notification";

export default function CreateRole({ onClose, isAdding, customer }) {
  const [inputValue, setInputValue] = useState({
    roleName: "",
    description: "",
  });

  const { createRole, updateRole } = UseRoleService();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isAdding) {
        await createRole(inputValue);
        onClose();
      } else if (customer) {
        await updateRole(customer.id, inputValue);
        onClose();
      }
      onClose();
    } catch (error) {
      showErrorAlert(error.message);
    }
  };

  return (
    <div className="justify-center items-center flex fixed inset-0 bg-opacity-30 backdrop-blur-sm">
      <div className="border rounded-lg border-gray-300 p-4 bg-white">
        <form className="w-96 h-2/3 max-w-lg" onSubmit={handleSubmit}>
          <h2 className="text-center text-lg font-semibold mb-4">
            {isAdding ? "Thêm quyền " : "Chỉnh sửa quyền"}
          </h2>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Phân quyền:
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="roleName"
              value={inputValue.roleName}
              onChange={handleInputChange}
              required
            >
              <option value="">--Phân quyền--</option>
              <option value="1">Nhân Viên</option>
              <option value="2">Quản lý</option>
              <option value="3">Giám đốc</option>
              <option value="4">Kế toán</option>
            </select>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Chú thích
              </label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type=""
                name="description"
                value={inputValue.description}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-white px-4 py-2 rounded-md mr-4 hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md`}
            >
              {isAdding ? "Thêm mới" : "Cập Nhật"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
