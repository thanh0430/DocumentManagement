import React, { useState } from "react";
import UseProjectService from "../hooks/UseProjectService";
import CreateProject from "../modals/CreateProject";
import DeleteProject from "../modals/DeleteProject";
import { Link } from "react-router-dom";

export default function ProjectAll() {
  const { projects } = UseProjectService();
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [currentProject, setCurrentProject] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 15; // Số sản phẩm trên mỗi trang

  const openAddModal = () => {
    setShowModal(true);
    setIsAdding(true);
    setCurrentProject(null); // Reset current project khi thêm mới
  };

  // Tính toán các dự án hiển thị trên trang hiện tại
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  // Chuyển trang
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-8 mt-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-200">
        <h2 className="text-xl font-semibold">Projects</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={openAddModal}
        >
          New project
        </button>
      </div>

      {/* Create Project Modal */}
      {showModal && (
        <CreateProject
          onClose={() => setShowModal(false)}
          isAdding={isAdding}
          project={currentProject}
        />
      )}

      {/* Delete Project Modal */}
      {showModalDelete && (
        <DeleteProject
          onClose={() => setShowModalDelete(false)}
          projectId={currentProjectId}
        />
      )}

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {currentProjects && currentProjects.length > 0 ? (
          currentProjects.map((project, index) => (
            <Link to={`/Task/${project.id}`}>
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-md flex flex-col space-y-3 max-w-xs mx-auto text-sm border border-gray-300"
            >
              <p className="text-xl font-bold">{project.projectName}</p>
              <p className="text-sm">
                <strong>Manager:</strong> {project.createdByName}
              </p>
              <p className="text-sm">
                <strong>Description:</strong> {project.description}
              </p>
              <p className="text-sm">
                <strong>👤 Members:</strong> {project.teamSize}
              </p>
              <p className="text-sm">
                <strong>📅 Start Date:</strong>{" "}
                {project.startDate.slice(0, 10)}
              </p>
              <p className="text-sm">
                <strong>📅 End Date:</strong> {project.endDate.slice(0, 10)}
              </p>
            </div>
            </Link>
          ))
        ) : (
          <p>No projects available.</p> // Hiển thị nếu danh sách rỗng
        )}
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col lg:flex-row justify-between mt-5">
        <div className="flex flex-col lg:flex-row items-center space-x-2 text-xs">
          <button className="py-2 px-4 bg-white text-gray-600 font-medium rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center">
            {itemsPerPage} items
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <p className="text-gray-500 mt-4 lg:mt-0">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, projects.length)} of{" "}
            {projects.length} entries
          </p>
        </div>

        <nav
          aria-label="Pagination"
          className="flex justify-center items-center text-gray-600 mt-8 lg:mt-0"
        >
          <button
            onClick={() => goToPage(currentPage - 1)}
            className="p-2 mr-4 rounded hover:bg-gray-100"
            disabled={currentPage === 1}
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
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-gray-200 text-gray-900 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            className="p-2 ml-4 rounded hover:bg-gray-100"
            disabled={currentPage === totalPages}
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
}
