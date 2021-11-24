import React from "react";
import "./styles/Pagination.css"

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
      <span id="selectPage">Select page:          </span>
        {pages.map((number) => {
          return (
            <li
              key={number}
              id={number}
              onClick={() => setCurrentPage(number)}
              className={currentPage === number ? "active" : null}
            >
              <button className="buttonList">{number}</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Pagination;
