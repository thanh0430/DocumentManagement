import React, { useState, useEffect } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { IoIosArrowRoundForward } from "react-icons/io";
import useFlowService from "../hooks/useFlowService";
const CreateFlowModal = ({ onClose, isAdding, title,Flows }) => {
  const { error, message, createFlow,updateFlow} = useFlowService();
  const [flowName, setFlowName] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (!isAdding && Flows) {
      // Khi chỉnh sửa, hiển thị thông tin luồng cũ
      setFlowName(Flows.name);
      setSelectedRoles(Flows.approvalLevels.map(level => level.name));
    } else {
      // Khi thêm mới, reset dữ liệu
      setFlowName("");
      setSelectedRoles([]);
    }
  }, [isAdding, Flows]);

  const addRole = () => {
    if (selectedRole && !selectedRoles.includes(selectedRole)) {
      setSelectedRoles([...selectedRoles, selectedRole]);
    }
  };

  const removeRole = (role) => {
    setSelectedRoles(selectedRoles.filter((r) => r !== role));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!flowName) {
      alert("Please enter a flow name.");
      return;
    }

    if (selectedRoles.length === 0) {
      alert("Please select at least one role.");
      return;
    }

    const newFlow = {
      name: flowName,
      approvalLevels: selectedRoles.map((role, index) => ({
        step: index + 1,
        roleId: role
      }))
    };


    if (isAdding) {
      await createFlow(newFlow);
    } else if (Flows) {
      await updateFlow(Flows.id, newFlow);
    }
    // Nếu thành công, đóng modal và reset state
    if (message) {
      onClose();
      setFlowName("");
      setSelectedRoles([]);
    } else if (error) {
      alert(error.message);
    }
  };
  return (
    <div className="justify-center items-center flex fixed inset-0 bg-opacity-30 backdrop-blur-sm">
      <div className="border rounded-lg border-gray-300 p-4 bg-white">
        <form className="w-96 max-w-lg">
          <h2 className="text-center text-lg font-semibold text-foreground mb-4">
            {title ? "Thêm luồng phê duyệt" : "Chỉnh sửa luồng phê duyệt"}
          </h2>
          <div className="mb-4">
            <label
              htmlFor="flow-name"
              className="block text-sm font-medium text-foreground"
            >
              Tên luồng
            </label>
            <input
              type="text"
              id="flow-name"
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              placeholder="Nhập tên luồng"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="roleSelector"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Chọn cấp phê duyệt
            </label>
            <div className="">
            <div className="select01 flex gap-2">
            <select
              id="roleSelector"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5"
            >
              <option value="">-- Chọn role --</option>
              <option value="2">Trưởng phòng</option>
              <option value="3">Giám đốc</option>
              <option value="4">Kế toán</option>
            </select>
            <div>
            <button type="button" onClick={addRole} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-1 mt-1 border border-blue-500 hover:border-transparent rounded">
            add role
            </button>
            </div>
            </div>
            <div className="role">
            <ul id="selectedRoles" className="flex gap-2 pt-3">
              {selectedRoles.map((role, index) => (
                <li key={index}>
                  {role}{" "}
                  <button
                    type="button"
                    onClick={() => removeRole(role)}
                  >
                   <CiCircleRemove /> 
                   <IoIosArrowRoundForward />
                  </button>
                 
                </li>
              ))}
            </ul>
          </div>
          </div>
          </div>
          <div className="flex float-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-muted text-muted-foreground px-4 py-2 rounded-md bg-gray-300 text-white mr-4 hover:bg-gray-400"
            >
              Hủy
            </button>
            {isAdding ? (
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
              >
                Thêm mới
              </button>
            ) : (
              <button
                type="submit"

                className="bg-blue-500 hover:bg-blue-600 text-white bg-primary text-primary-foreground px-4 py-2 rounded-md"
              >
                Cập Nhật
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFlowModal;
