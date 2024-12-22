import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UseCustomerService from "../hooks/UseCustomerService";

export default function AccountDetail() {
  const { fetchCustomerById } = UseCustomerService();
  const { id } = useParams();
  const [accountData, setAccountData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchCustomerById(id);
        setAccountData(data);
      } catch (err) {
        setError("Không thể tải thông tin tài khoản.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return <div className="text-center text-blue-500 mt-4 animate-pulse">Đang tải...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-4 font-semibold">{error}</div>;

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl animate-fadeIn">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Thông Tin Chi Tiết Tài Khoản
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DetailItem label="Họ và tên" value={`${accountData?.firstName} ${accountData?.lastName}`} />
          <DetailItem label="Email" value={accountData?.email} />
          <DetailItem label="Số điện thoại" value={accountData?.phoneNumber} />
          <DetailItem label="Giới tính" value={accountData?.gender} />
          <DetailItem label="Địa chỉ" value={accountData?.address} />
          <DetailItem label="Phòng ban" value={accountData?.departmentName} />
          <DetailItem
            label="Chức vụ"
            value={accountData?.roleName}
            className="col-span-2 text-center"
          />
        </div>
      </div>
    </div>
  );
}

// Component con để tái sử dụng các mục
const DetailItem = ({ label, value, className = "" }) => (
  <div className={`flex flex-col bg-gray-50 p-4 rounded-lg shadow-sm ${className}`}>
    <span className="text-sm font-semibold text-gray-500">{label}:</span>
    <span className="mt-1 text-gray-800 text-lg font-medium">{value || "N/A"}</span>
  </div>
);
