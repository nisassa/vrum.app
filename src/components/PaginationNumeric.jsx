import React from 'react';
import { Link } from 'react-router-dom';

function PaginationNumeric({
  totalPages,
  currentPage,
  links,
  refetch,
  setPageNumb,
  setPage
}) {
  const handlePageClick = () => {
    setPageNumb(2);
    refetch();
    console.log('Refetch');
  };

  const renderPageNumbers =
    links !== undefined &&
    links.map((link, index) => {
      // console.log(index);
      if (index === 0)
        return (
          <Link
            className='mr-2'
            key={index + link.label}
            to={index === 0 ? '' : currentPage - 1}
          >
            <span
              className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white border border-slate-200 ${
                link.url !== null
                  ? 'hover:bg-indigo-500 border border-slate-200 text-slate-600 hover:text-white shadow-sm'
                  : 'text-slate-300'
              }`}
            >
              <span className='sr-only'>Previous</span>
              <wbr />
              <svg className='h-4 w-4 fill-current' viewBox='0 0 16 16'>
                <path d='M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z' />
              </svg>
            </span>
          </Link>
        );
      if (link.label > 0)
        return (
          <li key={index + link.label}>
            <Link to={link.label} onClick={handlePageClick}>
              <span
                className={`inline-flex items-center justify-center rounded-l leading-5 px-3.5 py-2 bg-white border border-slate-200 ${
                  currentPage === link.label
                    ? 'text-indigo-500'
                    : 'text-slate-500'
                }`}
              >
                {link.label}
              </span>
            </Link>
          </li>
        );
      if (index === totalPages + 1)
        return (
          <li className='ml-2' key={index}>
            <Link
              to={totalPages}
              className='inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white hover:bg-indigo-500 border border-slate-200 text-slate-600 hover:text-white shadow-sm'
            >
              <span className='sr-only'>Next</span>
              <wbr />
              <svg className='h-4 w-4 fill-current' viewBox='0 0 16 16'>
                <path d='M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z' />
              </svg>
            </Link>
          </li>
        );
    });

  return (
    <div className='flex justify-center'>
      <nav className='flex' role='navigation' aria-label='Navigation'>
        <ul className='inline-flex text-sm font-medium -space-x-px shadow-sm'>
          {renderPageNumbers}
        </ul>
      </nav>
    </div>
  );
}

export default PaginationNumeric;
