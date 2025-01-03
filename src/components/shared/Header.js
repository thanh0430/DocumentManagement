import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { HiUser } from 'react-icons/hi';
import { useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import Breadcrumb from './Breadcrumb'; 
import { DASHBOARD_SIDEBAR_LINKS } from '../../lib';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const getBreadcrumbItems = (path, links) => {
  const token = localStorage.getItem("token");
  const pathSegments = path.split('/').filter(segment => segment);
  const items = [];
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
  pathSegments.reduce((prevPath, segment) => {
    const currentPath = `${prevPath}/${segment}`;
    const link = links.find(link => link.path === currentPath);

    if (link) {
      items.push({ label: link.label, href: link.path });
    }

    return currentPath;
  }, '');

  return items;
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const breadcrumbItems = getBreadcrumbItems(location.pathname, DASHBOARD_SIDEBAR_LINKS);
  const token = localStorage.getItem("token");
  let userId = "";

  // Lấy userId từ token
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.userId;
    } catch (error) {
      console.error("Lỗi khi giải mã token:", error.message);
    }
  }

  return (
    <div className="bg-white h-16 px-4 flex items-center border-b border-gray-200 justify-between">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex items-center gap-4">
        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
              <HiUser fontSize={24} />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`/AccountDetail/${userId}`}
                    className={classNames(
                      active && 'bg-gray-100',
                      'block px-4 py-2 text-gray-700 rounded-sm cursor-pointer'
                    )}
                  >
                    Thông tin tài khoản
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/login");
                    }}
                    className={classNames(
                      active && 'bg-gray-100',
                      'block px-4 py-2 text-gray-700 rounded-sm cursor-pointer'
                    )}
                  >
                    Đăng xuất
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
