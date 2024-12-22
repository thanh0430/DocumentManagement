import React from 'react';
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcBullish } from 'react-icons/fc';
import { HiOutlineLogout } from 'react-icons/hi';
import { DASHBOARD_SIDEBAR_LINKS } from '../../lib';

const linkClass =
  'flex items-center gap-2 font-light px-3 py-2 rounded-sm text-base hover:bg-blue-300 active:bg-blue-300';


export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = (linkPath) => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(linkPath);
    } else {
      navigate('Login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token040302'); // Xóa token
    navigate('Login'); // Chuyển hướng đến trang đăng nhập
  };

  return (
    <div className="bg-neutral-200 w-60 p-3 flex flex-col sm:w-16 md:w-24 lg:w-48 xl:w-60">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcBullish fontSize={20} />
        <span className=" text-sm">DocumentManagement</span>
      </div>
      <hr className="my-2 bg-blue-300" />
      <div className="py-2 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} pathname={pathname} onClick={handleLinkClick} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 mt-auto">
        <div
          onClick={handleLogout}
          className={classNames(linkClass, 'cursor-pointer text-red-500')}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Đăng xuất
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ link, pathname, onClick }) {
  return (
    <div onClick={() => onClick(link.path)} className={classNames(
      linkClass,
      {
        'bg-blue-300 ': pathname === link.path,
        'hover:bg-blue-300': pathname !== link.path,
        'text-neutral-950': pathname !== link.path,
      }
    )}>
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </div>
  );
}
