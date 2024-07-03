import React from 'react'
import DashboardStatsGrid from '../components/DashboardStatsGrid'
import TransactionChart from '../components/TransactionChart'
import BuyerProfilePieChart from '../components/BuyerProfilePieChart'


export default function Dashboard() {
	return (
		<div className="flex flex-col gap-4">
			<span className='text-orange-900'>chào mừng bạn đến với trang admin</span>
			<DashboardStatsGrid />
			<div className="flex flex-row gap-4 w-full">
				<TransactionChart />
				<BuyerProfilePieChart />
			</div>

		</div>
	)
}

