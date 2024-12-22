import React, { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import UseWorkLogService from "../hooks/UseWorkLogService";

const WorkLog = () => {
  const token = localStorage.getItem("token");
  const { WorkLogs, loading, error, fetchWorkLogById, createWorkLog } =
    UseWorkLogService();

  let userId;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.userId;
      console.log("userId", userId);
    } catch (error) {
      console.error("Lỗi khi giải mã token:", error.message);
    }
  }

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [hoursWorked, setHoursWorked] = useState(
    Array.from({ length: daysInMonth }, () => "")
  );

  useEffect(() => {
    if (userId) fetchWorkLogById(userId);
  }, [userId]);

  useEffect(() => {
    if (Array.isArray(WorkLogs) && WorkLogs.length > 0) {
      const updatedHours = Array.from({ length: daysInMonth }, (_, i) => {
        const dayOfMonth = i + 1;
        const log = WorkLogs.find(
          (item) => new Date(item.workDate).getDate() === dayOfMonth
        );
        return log ? log.hoursWorked : "";
      });
      setHoursWorked(updatedHours);
    }
  }, [WorkLogs, daysInMonth]);

  const handleHoursChange = (index, value) => {
    const updatedHours = [...hoursWorked];
    updatedHours[index] = value;
    setHoursWorked(updatedHours);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateWorkLog = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    console.log("handleCreateWorkLog được gọi");

    try {
      const newWorkLogs = hoursWorked
        .map((hours, index) => ({
          userId: userId,
          workDate: new Date(
            Date.UTC(currentYear, currentMonth - 1, index + 1)
          ).toISOString(),
          hoursWorked: parseFloat(hours) || 0,
        }))
        .filter((log) => log.hoursWorked >= 0);

      await Promise.all(newWorkLogs.map((log) => createWorkLog(log)));
      fetchWorkLogById(userId);
    } catch (error) {
      console.error("Lỗi khi tạo WorkLog:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, userId, hoursWorked, currentYear, currentMonth]);

  const totalHoursWorked = hoursWorked.reduce((total, hour) => {
    const parsedHour = parseFloat(hour);
    return total + (isNaN(parsedHour) ? 0 : parsedHour);
  }, 0);

  const workingDays = hoursWorked.filter((hour) => parseFloat(hour) > 0).length;

  const maxHour = Math.max(...hoursWorked.map((hour) => parseFloat(hour) || 0));
  const maxHourDay =
    hoursWorked.findIndex((hour) => parseFloat(hour) === maxHour) + 1;

  const minHour = Math.min(
    ...hoursWorked
      .filter((hour) => parseFloat(hour) > 0)
      .map((hour) => parseFloat(hour))
  );
  const minHourDay =
    hoursWorked.findIndex((hour) => parseFloat(hour) === minHour) + 1;

  const averageHours =
    workingDays > 0 ? (totalHoursWorked / workingDays).toFixed(2) : 0;

  return (
    <div className="w-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        TimeSheet Management
      </h1>
      {/* Bảng Nhập Giờ */}
      <div className="relative w-11/12 overflow-x-auto pb-4">
        <table className="min-w-[2000px] table-fixed border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr>
              <th className="border border-gray-300 bg-blue-400 text-white px-4 py-2 text-center font-semibold w-40">
                Day/Month
              </th>
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                (day) => (
                  <th
                    key={day}
                    className="border border-gray-300 bg-blue-200 px-2 py-2 text-center text-sm font-semibold text-blue-800"
                  >
                    {`${weekdays[(day - 1) % 7]}, ${currentMonth}/${day}`}
                  </th>
                )
              )}
              <th className="border border-gray-300 bg-blue-400 text-white px-4 py-2 text-center font-semibold w-56">
                Total Hours
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 bg-white px-4 py-2 text-center font-medium text-gray-700 h-12">
                Work Hours
              </td>
              {hoursWorked.map((hour, index) => (
                <td
                  key={index}
                  className="border border-gray-300 bg-gray-50 text-center"
                >
                  <input
                    type="number"
                    min="0"
                    max="24"
                    value={hour}
                    onChange={(e) => handleHoursChange(index, e.target.value)}
                    className="w-full text-center border-none focus:ring-0 text-xl"
                    placeholder="0"
                  />
                </td>
              ))}
              <td className="border border-gray-300 bg-gray-200 text-center font-semibold text-gray-800">
                {totalHoursWorked}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Thống Kê */}
      <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">
          Tổng Giờ Làm Việc:{" "}
          <span className="text-green-600">{totalHoursWorked} giờ</span>
        </h2>
        <p className="text-gray-700">
          Tổng số ngày làm việc:{" "}
          <span className="text-blue-600">{workingDays} ngày</span>
        </p>
        <p className="text-gray-700">
          Ngày làm việc nhiều nhất:{" "}
          <span className="text-blue-600">
            {maxHourDay > 0 ? `Ngày ${maxHourDay} (${maxHour} giờ)` : "N/A"}
          </span>
        </p>
        <p className="text-gray-700">
          Ngày làm việc ít nhất:{" "}
          <span className="text-blue-600">
            {minHourDay > 0 ? `Ngày ${minHourDay} (${minHour} giờ)` : "N/A"}
          </span>
        </p>
        <p className="text-gray-700">
          Trung bình giờ làm mỗi ngày:{" "}
          <span className="text-blue-600">{averageHours} giờ</span>
        </p>
      </div>

      {/* Nút Tạo Công Số */}
      <div className="flex justify-start mt-6">
        <button
          onClick={handleCreateWorkLog}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Create WorkLog
        </button>
      </div>
    </div>
  );
};

export default WorkLog;
