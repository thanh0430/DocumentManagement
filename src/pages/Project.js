import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import UseProjectService from "../hooks/UseProjectService";
import CreateProject from "../modals/CreateProject";
import DeleteProject from "../modals/DeleteProject";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Project() {
  const chartRef = useRef(null);
  const { projects } = UseProjectService();
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [currentProject, setCurrentProject] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  const openAddModal = () => {
    setShowModal(true);
    setIsAdding(true);
    setCurrentProject(null); // Reset current customer khi thêm mới
  };
  const openEdit = (project) => {
    setShowModal(true);
    setIsAdding(false);
    setCurrentProject(project);
  };
  const openDelete = (projectId) => {
    setCurrentProjectId(projectId);
    setShowModalDelete(true);
  };
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Project Stats",
        data: [20, 30, 70, 100, 80, 40, 50],
        backgroundColor: "#4f46e5",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        type: "linear", // Ensure "linear" scale is defined here
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  // Clean up the chart when the component is unmounted
  useEffect(() => {
    const chartInstance = chartRef.current;

    return () => {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the chart instance to avoid canvas reuse issues
      }
    };
  }, []);

  // Dữ liệu bảng
  const topClients = [
    { name: "Twyla Leggett", amount: "$46234.8" },
    { name: "Berna Pawelczyk", amount: "$14304.15" },
    { name: "Urson Twinbrow", amount: "$3765.6" },
    { name: "Sinclare Longhorne", amount: "$80469.34" },
    { name: "Dredi Chainey", amount: "$6019.38" },
  ];
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  // Tính toán các mục hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div>
      <div className=" bg-white grid grid-cols-1 md:grid-cols-4 gap-6 mt-5">
        {[
          {
            title: "Total revenue",
            value: "$1,556",
            trend: "↑ 280%",
            trendColor: "text-green-500",
          },
          {
            title: "Spent this week",
            value: "$1,806",
            trend: "↑ 180%",
            trendColor: "text-green-500",
          },
          {
            title: "Worked this week",
            value: "35:12",
            trend: "↓ -10%",
            trendColor: "text-red-500",
          },
          {
            title: "Worked today",
            value: "05:30:00",
            trend: "↓ -20%",
            trendColor: "text-red-500",
          },
        ].map((item, index) => (
          <div
            key={index}
            className=" p-5 rounded-lg shadow-md flex flex-col justify-between"
          >
            <h3 className="text-sm text-muted mb-2">{item.title}</h3>
            <div className="flex flex-row justify-between items-center">
              <p className="text-2xl font-semibold">{item.value}</p>
              <span className={`text-sm font-medium ${item.trendColor}`}>
                {item.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 bg-white rounded-lg shadow-lg space-y-8 mt-8">
        {/* Recently Added Projects */}
        <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-200">
          <h2 className="text-lg font-bold">Recently Added Projects</h2>
          <button
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-lg"
            onClick={() => navigate("/ProjectAll")}
          >
            View all projects
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {projects && projects.length > 0 ? (
            projects.slice(0, 5).map((project, index) => (
              <Link to={`/Task/${project.id}`} className="flex items-center">
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
      </div>

      {/* Project Stats Section with Chart */}
      <div className="flex w-full mt-8">
        <div className="bg-white p-4 shadow rounded-lg flex flex-col md:flex-row gap-4  w-3/4">
          <div className="w-full md:w-2/3">
            <div className="h-64">
              {/* Render the Bar chart */}
              <Bar ref={chartRef} data={data} options={options} />
            </div>
          </div>
          {/* Section: Top Clients */}
        </div>
        <div className="w-full md:w-1/3 bg-white ml-5">
          <h3 className="text-lg font-bold mb-4">Top Clients</h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            {topClients.map((client, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b last:border-none"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span className="text-gray-700">{client.name}</span>
                </div>
                <span className="text-gray-800 font-semibold">
                  {client.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white p-4 shadow rounded-lg flex-col md:flex-row gap-4 mt-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">Projects</h2>
          <div className="flex gap-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
              onClick={openAddModal}
            >
              New project
            </button>
            {showModal && (
              <CreateProject
                onClose={() => setShowModal(false)}
                isAdding={isAdding}
                project={currentProject} 
              />
            )}
            {showModalDelete && (
              <DeleteProject
                onClose={() => setShowModalDelete(false)}
                projectId={currentProjectId}
              />
            )}
          </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-100">
              <tr className="text-base">
                <th className="px-6 py-3 font-medium text-gray-700">Name</th>
                <th className="px-6 py-3 font-medium text-gray-700">
                  Người tạo
                </th>
                <th className="px-6 py-3 font-medium text-gray-700">
                  Priority
                </th>
                <th className="px-6 py-3 font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 font-medium text-gray-700">
                  Team size
                </th>
                <th className="px-6 py-3 font-medium text-gray-700">
                  Start Date
                </th>
                <th className="px-6 py-3 font-medium text-gray-700">
                  End Date
                </th>
                <th className="px-6 py-3 font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 text-gray-900"
                >
                  <td className="px-6 py-4">{project.projectName}</td>
                  <td className="px-6 py-4">{project.createdByName}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full
                        ${
                          project.priority === 1 ? "text-white bg-red-500" : ""
                        }  // Critical
                        ${
                          project.priority === 2
                            ? "text-white bg-yellow-500"
                            : ""
                        } // High
                        ${
                          project.priority === 3 ? "text-white bg-blue-500" : ""
                        }   // Medium
                        ${
                          project.priority === 4
                            ? "text-white bg-green-500"
                            : ""
                        }  // Low
                      `}
                    >
                      {
                        project.priority === 1
                          ? "Critical"
                          : project.priority === 2
                          ? "High"
                          : project.priority === 3
                          ? "Medium"
                          : project.priority === 4
                          ? "Low"
                          : "Unknown" // Nếu priority không phải là 1, 2, 3, 4
                      }
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {project.status === 1
                      ? "Open"
                      : project.status === 2
                      ? "In Progress"
                      : project.status === 3
                      ? "Done"
                      : "Unknown"}
                  </td>
                  <td className="px-6 py-4">{project.teamSize}</td>
                  <td className="px-6 py-4">
                    {project.startDate.slice(0, 10)}{" "}
                  </td>
                  <td className="px-6 py-4">{project.endDate.slice(0, 10)} </td>
                  <td className="px-6 py-4 flex ">
                    <button className="mr-7 " onClick={() => openEdit(project)}>
                      <GrEdit fontSize={20} />
                    </button>
                    <button>
                      <RiDeleteBin6Line
                        fontSize={20}
                        onClick={() => openDelete(project.id)}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col lg:flex-row justify-between mt-5">
          <div className="flex flex-col lg:flex-row items-center space-x-2 text-xs">
            <button className="py-2 px-4 bg-white text-gray-600 font-medium rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center">
              {itemsPerPage} items
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
            {/* Nút Previous */}
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

            {/* Số trang */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-gray-200 text-gray-900 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Nút Next */}
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
    </div>
  );
}
