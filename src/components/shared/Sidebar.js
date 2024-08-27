import React from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { FcBullish } from 'react-icons/fc';
import { HiOutlineLogout } from 'react-icons/hi';
import { DASHBOARD_SIDEBAR_LINKS } from '../../lib';

const linkClass =
  'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col sm:w-16 md:w-24 lg:w-48 xl:w-60">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcBullish fontSize={20} />
        <span className="text-neutral-200 text-sm">DocumentManagement</span>
      </div>
      <hr className="my-2 border-neutral-700" />
      <div className="py-2 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} pathname={pathname} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 mt-auto"> {/* Điều chỉnh lớp để nút Đăng xuất ở dưới cùng */}
        <div className={classNames(linkClass, 'cursor-pointer text-red-500')}>
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Đăng xuất
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ link, pathname }) {
  return (
    <Link
      to={link.path}
      className={classNames(
        'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base',
        {
          'bg-neutral-700 text-white': pathname === link.path,
          'text-neutral-400': pathname !== link.path,
        }
      )}
    >
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}
