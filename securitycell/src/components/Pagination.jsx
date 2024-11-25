import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const totalVisiblePages = 5; // Number of visible pages
    const totalMiddlePages = totalVisiblePages - 2; // Number of pages excluding the first and last
    const totalPagesToShow = Math.min(totalVisiblePages, totalPages);

    if (totalPagesToShow === totalPages) {
      // If total pages fit within the visible range
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const middleStart = Math.max(currentPage - Math.floor(totalMiddlePages / 2), 2);
    const middleEnd = middleStart + totalMiddlePages;

    if (middleEnd >= totalPages) {
      // If middleEnd exceeds total pages
      return Array.from({ length: totalVisiblePages - 1 }, (_, index) => totalPages - (totalVisiblePages - 2 - index));
    }

    return [1, '...', ...Array.from({ length: totalMiddlePages }, (_, index) => middleStart + index), '...', totalPages];
  };

  return (
    <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
      <div className="lg:w-3/5 w-full flex items-center justify-between border-t border-gray-200">
        <div
          className={`flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer ${
            isFirstPage ? 'cursor-not-allowed' : ''
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.1665 4H12.8332"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.1665 4L4.49984 7.33333"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.1665 4.00002L4.49984 0.666687"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-sm ml-3 font-medium leading-none">Previous</p>
        </div>
        <div className="sm:flex hidden">
          {getVisiblePages().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <p className="text-sm font-medium leading-none pt-3 mr-4 px-2">{page}</p>
              ) : (
                <p
                  className={`text-sm font-medium leading-none cursor-pointer ${
                    page === currentPage ? 'text-sky-700 border-t border-sky-400' : 'text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400'
                  } pt-3 mr-4 px-2`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </p>
              )}
            </React.Fragment>
          ))}
        </div>
        <div
          className={`flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer ${
            isLastPage ? 'cursor-not-allowed' : ''
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <p className="text-sm font-medium leading-none mr-3">Next</p>
          <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.1665 4H12.8332"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 7.33333L12.8333 4"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 0.666687L12.8333 4.00002"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
