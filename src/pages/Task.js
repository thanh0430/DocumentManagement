import React, { useState, useEffect } from "react";
import UseTaskService from "../hooks/UseTaskService";
import { useParams, useNavigate } from "react-router-dom";
import TaskColumn from "./TaskColumn";
import UseCustomerService from "../hooks/UseCustomerService";

export default function Task() {
  const { task, loading, error, fetchTaskByProjectId, createTask } =
    UseTaskService();
  const { projectId } = useParams(); // Get projectId from URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  const { customers } = UseCustomerService();
  const navigate = useNavigate();

  // State để xử lý dữ liệu form khi tạo task
  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    assignedId: "",
    projectId: projectId,
    status: 1,
    priority: 0,
    startDate: "",
    endDate: "",
  });

  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (projectId && !isFetched) {
      fetchTaskByProjectId(projectId);
      setIsFetched(true); 
    }
  }, [projectId, fetchTaskByProjectId, isFetched]);
  
 
  // Kiểm tra trạng thái loading và lỗi
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const groupedTasks = {
    open: task.filter((task) => task.status === 1),
    inProgress: task.filter((task) => task.status === 2),
    done: task.filter((task) => task.status === 3),
    bug: task.filter((task) => task.status === 4),
    testing: task.filter((task) => task.status === 5),
  };

  // Hàm mở modal khi thêm task
  const handleAddTask = (column) => {
    setSelectedColumn(column);
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedColumn("");
    setFormData({
      taskName: "",
      description: "",
      assignedId: "",
      projectId: "",
      status: 1,
      priority: 0,
      startDate: "",
      endDate: "",
    });
  };

  // Hàm submit form khi thêm task
  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(formData);
    closeModal();
    fetchTaskByProjectId(projectId);
  };

  // Hàm xử lý sự kiện thay đổi input trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "priority" ? parseInt(value) : value,
    }));
  };
  

  const handleTaskClick = (taskId) => {
    const selectedTask = task.find(t => t.id === taskId);
    navigate(`/edit-task/${taskId}`, { state: { task: selectedTask } });
  };
  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <div className="px-10 mt-6">
        <h1 className="text-2xl font-bold">Team Project Board</h1>
      </div>
      <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto w-screen">
        <TaskColumn
          title="Open"
          tasks={groupedTasks.open}
          onAddTask={() => handleAddTask("Open")}
          onTaskClick={handleTaskClick}
        />
        <TaskColumn
          title="In Progress"
          tasks={groupedTasks.inProgress}
          onAddTask={() => handleAddTask("In Progress")}
          onTaskClick={handleTaskClick}
        />
        <TaskColumn
          title="Bug"
          tasks={groupedTasks.bug}
          onAddTask={() => handleAddTask("Bug")}
          onTaskClick={handleTaskClick}
        />
        <TaskColumn
          title="Testing"
          tasks={groupedTasks.testing}
          onAddTask={() => handleAddTask("Testing")}
          onTaskClick={handleTaskClick}
        />
        <TaskColumn
          title="Done"
          tasks={groupedTasks.done}
          onAddTask={() => handleAddTask("Done")}
          onTaskClick={handleTaskClick}
        />
      </div>

      {/* Modal để thêm task */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">
              Add Task to {selectedColumn}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="taskName"
                >
                  Task Name
                </label>
                <input
                  type="text"
                  id="taskName"
                  name="taskName"
                  value={formData.taskName}
                  onChange={handleInputChange}
                  placeholder="Task Name"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="assignedId"
                >
                  Assigned To
                </label>
                <select
                  id="assignedTo"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select User</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.firstName} {customer.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value={1}>Open</option>
                  <option value={2}>In Progress</option>
                  <option value={3}>Done</option>
                  <option value={4}>Bug</option>
                  <option value={5}>Testing</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="priority"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  placeholder="Priority"
                  className="w-full p-2 border rounded"
                  required
                >
                 <option value={1}>Low</option>
                  <option value={2}>Medium</option>
                  <option value={3}>High</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="startDate"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-semibold mb-1"
                  htmlFor="endDate"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
