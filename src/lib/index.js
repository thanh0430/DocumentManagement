import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiUserGroup
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Trang chủ',
		path: '/',
		icon: <HiOutlineViewGrid />
	},

	{
		key: '',
		label: 'Quản lý chức vụ',
		path: '/Role',
		icon: <HiUserGroup />
	},
	{
		key: 'customers',
		label: 'Quản lý nhân viên',
		path: '/Customers',
		icon: <HiOutlineUsers />
	},
	{
		key: 'Docment',
		label: 'Quản lý tài liệu',
		path: '/Document',
		icon: <HiOutlineDocumentText />
	},
	{
		key: '',
		label: 'Quản lý luồng phê duyệt',
		path: '/ApprovalFlow',
		icon: <HiOutlineAnnotation />
	},
	{
		key: '',
		label: 'Yêu cầu phê duyệt',
		path: '/RequestApproval',
		icon: <HiOutlineCube />
	},
	{
		key: '',
		label: 'Project',
		path: '/Project',
		icon: <HiOutlineCube />
	},
	{
		key: '',
		label: 'Time sheet',
		path: '/workLog',
		icon: <HiOutlineCube />
	},
	{
		key: '',
		label: 'Báo cáo',
		path: '/Report',
		icon: <HiOutlineCube />
	},
]


