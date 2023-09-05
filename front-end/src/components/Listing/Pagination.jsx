import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const maxPageToShow = Math.min(
      currentPage + Math.floor(maxVisiblePages / 2),
      totalPages
    );

    for (
      let i = Math.max(1, maxPageToShow - maxVisiblePages + 1);
      i <= maxPageToShow;
      i++
    ) {
      pageNumbers.push(
        <li key={i}>
          <Link
            className={currentPage === i ? "active" : ""}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Link>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="row">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="pagination-wrap">
              <ul>
                <li>
                  {currentPage > 1 && (
                    <Link onClick={() => onPageChange(currentPage - 1)}>
                      &laquo; Prev
                    </Link>
                  )}
                </li>
                {renderPageNumbers()}
                <li>
                  {currentPage < totalPages && (
                    <Link onClick={() => onPageChange(currentPage + 1)}>
                      Next &raquo;
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
