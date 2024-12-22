import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UseTaskService from "../hooks/UseTaskService";
import UseCustomerService from "../hooks/UseCustomerService";

export default function EditTask() {
  const location = useLocation();
  const navigate = useNavigate();
  const { customers } = UseCustomerService();
  const { task } = location.state; // Lấy task từ state
  const { updateTask, loading, error } = UseTaskService();
  const [formData, setFormData] = useState({
    taskName: task.taskName,
    description: task.description,
    assignedTo: task.fullName,
    startDate: task.startDate,
    endDate: task.endDate,
    status: task.status,
  });
  console.log("formData task", formData);
  useEffect(() => {
    if (task) {
      setFormData({
        taskName: task.taskName,
        description: task.description,
        assignedTo: task.assignedTo,
        startDate: task.startDate,
        endDate: task.endDate,
        status: task.status,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(formData); // Cập nhật task
      navigate(`/task/${task.projectId}`); // Điều hướng về trang task sau khi cập nhật
      console.log("Task updated successfully!");
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
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
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Task Name"
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
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Description"
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
            onChange={handleChange}
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
            htmlFor="startDate"
          >
            Start Date
          </label>
          <input
            type="datetime-local"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1" htmlFor="endDate">
            End Date
          </label>
          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
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
            onChange={handleChange}
            placeholder="Priority"
            className="w-full p-2 border rounded"
            required
          >
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
}
