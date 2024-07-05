import React from 'react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 010-1.414L11.586 10 7.707 6.707a1 1 0 011.414-1.414l4.292 4.292a1 1 0 010 1.414l-4.292 4.292a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            <a href={item.href} className="text-sm font-medium text-gray-700 hover:text-gray-900">
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
