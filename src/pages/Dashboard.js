import React from 'react';
import DashboardStatsGrid from '../components/statistics/DashboardStatsGrid';
import TransactionChart from '../components/statistics/TransactionChart';
import BuyerProfilePieChart from '../components/statistics/BuyerProfilePieChart';
import { showAlert, showErrorAlert } from '../components/shared/Notification';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <button onClick={showErrorAlert}>Hiển thị thông báo lỗi</button>
      </div>
	  <div>
        <button onClick={showAlert}>Hiển thị thông báo thành công</button>
      </div>
      
      <span className='text-orange-900'>Chào mừng bạn đến với trang admin</span>
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full">
        <TransactionChart />
        <BuyerProfilePieChart />
      </div>
    </div>
  );
}