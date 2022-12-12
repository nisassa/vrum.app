import React from 'react';
import { Link } from 'react-router-dom';

function PaginationNumeric({
  totalPages,
  currentPage,
  links,
  refetch,
  pageNumb,
  setPageNumb,
  setPage,
  isLoading
}) {
  const handlePageClick = (e) => {
    if (e > 0 && e < totalPages + 1) setPageNumb(e);
  };

  const renderPageNumbers =
    links !== undefined &&
    links.map((link, index) => {
      // console.log(index);

      if (link.label > 0)
        return (
          <li key={index + link.label}>
            <Link
              to={`/my-team/${index}`}
              onClick={() => handlePageClick(link.label)}
            >
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
    });

  return (
    <div className='flex justify-center'>
      <nav className='flex' role='navigation' aria-label='Navigation'>
        <div className='ml-2'>
          <Link
            className='mr-2'
            to={`/my-team/${currentPage !== 0 ? currentPage : currentPage - 1}`}
            onClick={() => handlePageClick(currentPage - 1)}
          >
            <span
              className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white border border-slate-200 ${
                currentPage === 1
                  ? 'text-slate-300'
                  : 'hover:bg-indigo-500 border border-slate-200 text-slate-600 hover:text-white shadow-sm'
              }`}
            >
              <span className='sr-only'>Previous</span>
              <wbr />
              <svg className='h-4 w-4 fill-current' viewBox='0 0 16 16'>
                <path d='M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z' />
              </svg>
            </span>
          </Link>
        </div>
        <ul className='inline-flex text-sm font-medium -space-x-px shadow-sm'>
          {renderPageNumbers}
        </ul>
        <div className='ml-2'>
          <Link
            to={`/my-team/${
              currentPage === totalPages ? currentPage : currentPage + 1
            }`}
            onClick={() => handlePageClick(currentPage + 1)}
            className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2 bg-white border border-slate-200 ${
              currentPage === totalPages
                ? 'text-slate-300'
                : 'hover:bg-indigo-500 border border-slate-200 text-slate-600 hover:text-white shadow-sm'
            }`}
          >
            <span className='sr-only'>Next</span>
            <wbr />
            <svg className='h-4 w-4 fill-current' viewBox='0 0 16 16'>
              <path d='M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z' />
            </svg>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default PaginationNumeric;
