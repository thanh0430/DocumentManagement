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
		path: '/chucvu',
		icon: <HiUserGroup />
	},
	{
		key: 'customers',
		label: 'Quản lý nhân viên',
		path: '/customers',
		icon: <HiOutlineUsers />
	},
	{
		key: 'Docment',
		label: 'Quản lý tài liệu',
		path: '/Docment',
		icon: <HiOutlineDocumentText />
	},
	{
		key: '',
		label: 'Quản lý luồng phê duyệt',
		path: '/phê duyệt',
		icon: <HiOutlineAnnotation />
	},
	{
		key: '',
		label: 'Yêu cầu phê duyệt',
		path: '/yêu cầu',
		icon: <HiOutlineCube />
	},
]


