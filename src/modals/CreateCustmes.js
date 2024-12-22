import React, { useState, useEffect } from "react";
import UseCustomerService from "../hooks/UseCustomerService";
import { showAlert, showErrorAlert } from "../components/shared/Notification";

export default function CreateCustmes({ onClose, isAdding, customer }) {
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
    gender: "",
    roleId: "",
    departmentId: "",
    salary: {
      baseSalary: "",
      allowances: "",
      bonus: "",
    },
  });

  const { createCustomer, updateCustomer } = UseCustomerService();

  useEffect(() => {
    if (customer) {
      setInputValue({
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        address: customer.address || "",
        email: customer.email || "",
        password: "", // Không cần điền password khi chỉnh sửa
        gender: customer.gender || "",
        roleId: customer.roleId || "",
        departmentId: customer.departmentId || "",
      });
    } else {
      setInputValue({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        password: "",
        gender: "",
        roleId: "",
        departmentId: "",
      });
    }
  }, [customer]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Xử lý các trường trong salary
    if (["baseSalary", "allowances", "bonus"].includes(name)) {
      setInputValue((prev) => ({
        ...prev,
        salary: { ...prev.salary, [name]: value },
      }));
    } else {
      setInputValue((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isAdding) {
        await createCustomer(inputValue);
        onClose();
      } else if (customer) {
        await updateCustomer(customer.id, inputValue);
        onClose();
      }
    } catch (error) {
      showErrorAlert(error.message);
    }
  };

  return (
    <div className="justify-center items-center flex fixed inset-0 bg-opacity-30 backdrop-blur-sm">
      <div className="border rounded-lg border-gray-300 p-4 bg-white w-full max-w-lg max-h-screen overflow-y-auto">
        <form className="w-full" onSubmit={handleSubmit}>
          <h2 className="text-center text-lg font-semibold mb-4">
            {isAdding ? "Thêm nhân viên" : "Chỉnh sửa nhân viên"}
          </h2>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Họ:
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                name="firstName"
                value={inputValue.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Tên
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                name="lastName"
                value={inputValue.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Địa Chỉ:
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                name="address"
                value={inputValue.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Email:
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="email"
                name="email"
                value={inputValue.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Password:
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="password"
                name="password"
                value={inputValue.password}
                onChange={handleInputChange}
                required={!isAdding} // Chỉ yêu cầu password khi không phải thêm mới
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Giới tính
              </label>
              <div className="flex justify-between items-center">
                {/* Giới tính Nam */}
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="genderMale"
                    name="gender"
                    value="Nam"
                    checked={inputValue.gender === "Nam"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="genderMale" className="ml-2">
                    Nam
                  </label>
                </div>

                {/* Giới tính Nữ */}
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="genderFemale"
                    name="gender"
                    value="Nữ"
                    checked={inputValue.gender === "Nữ"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="genderFemale" className="ml-2">
                    Nữ
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Phân quyền:
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="roleId"
                value={inputValue.roleId}
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
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Phòng ban
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="departmentId"
                value={inputValue.departmentId}
                onChange={handleInputChange}
                required
              >
                <option value="">--Phòng ban--</option>
                <option value="1">IT</option>
                {/* Thêm các phòng ban khác nếu cần */}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Lương cơ bản:
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="number"
                name="baseSalary"
                value={inputValue.baseSalary}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Phụ cấp
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="number"
                name="allowances"
                value={inputValue.allowances}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Tiền thưởng:
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="number"
                name="Bonus"
                value={inputValue.Bonus}
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
