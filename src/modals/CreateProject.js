import React, { useState, useEffect } from "react";
import UseProjectService from "../hooks/UseProjectService";
import { showAlert, showErrorAlert } from "../components/shared/Notification";
import UseCustomerService from "../hooks/UseCustomerService";

export default function CreateProject({ onClose, isAdding, project }) {
  const { customers } = UseCustomerService();
  const [inputValue, setInputValue] = useState({
    projectName: "",
    status: "",
    priority: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentSelection, setCurrentSelection] = useState([]);

  const { createProject, updateProject } = UseProjectService();

  useEffect(() => {
    if (project) {
      setInputValue({
        projectName: project.projectName || "",
        status: project.status || "",
        priority: project.priority || "",
        startDate: project.startDate || "",
        endDate: project.endDate || "",
        description: project.description || "",
      });
      setSelectedUsers(project.teamMember || []);
    }
  }, [project]);

  // Xử lý thay đổi input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý chọn thành viên nhóm
  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => parseInt(option.value)
    );
    setCurrentSelection(selectedOptions);
  };

  // Thêm thành viên nhóm
  const handleAddUsers = () => {
    const uniqueUsers = Array.from(
      new Set([...selectedUsers, ...currentSelection])
    );
    setSelectedUsers(uniqueUsers);
    setCurrentSelection([]);
  };

  // Xóa thành viên nhóm
  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((id) => id !== userId));
  };

  // Xử lý submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    const projectData = {
      ...inputValue,
      teamMember: selectedUsers,
      createBy: 2, // Giả sử ID người tạo là 2
    };

    try {
      if (isAdding) {
        await createProject(projectData);
        showAlert("Dự án đã được tạo thành công!");
      } else if (project) {
        await updateProject(project.id, projectData);
        showAlert("Dự án đã được cập nhật thành công!");
      }
      onClose();
    } catch (error) {
      showErrorAlert(error.message);
    }
  };

  return (
    <div className="justify-center items-center flex fixed inset-0 bg-opacity-30 backdrop-blur-sm">
      <div className="border rounded-lg border-gray-300 p-4 bg-white">
        <form className="w-screen h-2/3 max-w-lg" onSubmit={handleSubmit}>
          <h2 className="text-center text-lg font-semibold mb-4">
            {isAdding ? "Thêm dự án" : "Chỉnh sửa dự án"}
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tên dự án
            </label>
            <input
              type="text"
              name="projectName"
              value={inputValue.projectName}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Trạng thái
              </label>
              <select
                name="status"
                value={inputValue.status}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Chọn trạng thái</option>
                <option value="1">Open</option>
                <option value="2">In Progress</option>
                <option value="3">Done</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mức độ ưu tiên
              </label>
              <select
                name="priority"
                value={inputValue.priority}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Chọn mức độ</option>
                <option value="1">Critical</option>
                <option value="2">High</option>
                <option value="3">Medium</option>
                <option value="4">Low</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Ngày bắt đầu
              </label>
              <input
                type="date"
                name="startDate"
                value={inputValue.startDate}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Ngày kết thúc
              </label>
              <input
                type="date"
                name="endDate"
                value={inputValue.endDate}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mô tả
            </label>
            <textarea
              name="description"
              value={inputValue.description}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Thành viên nhóm
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              onChange={handleSelectChange}
            >
              <option value="">-- Chọn thành viên --</option>
              {customers &&
                customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.firstName + customer.lastName}
                  </option>
                ))}
            </select>
            <button
              type="button"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleAddUsers}
            >
              Thêm thành viên
            </button>
            <ul className="mt-2">
              {selectedUsers.map((userId) => {
                const user = customers.find(
                  (customer) => customer.id === userId
                );
                return (
                  <li
                    key={userId}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {user
                        ? `${user.firstName} ${user.lastName}`
                        : "Không xác định"}
                    </span>
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => handleRemoveUser(userId)}
                    >
                      X
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isAdding ? "Thêm mới" : "Cập nhật"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
