import React from "react";

function Pagination({
  currentPage,
  setCurrentPage,
  totalVideogames,
  itemsPerPage,
}) {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalVideogames / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      <ul className="pageNumbers">
        {pages.map((number) => {
          return (
            <li
              key={number}
              id={number}
              onClick={() => setCurrentPage(number)}
              className={currentPage === number ? "active" : null}
            >
              <button>{number}</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Pagination;
