import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationList = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  console.log("totalPosts", totalPosts);
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <a onClick={() => paginate(number)} href="!#">
            {number}
          </a>
        ))}
      </ul>
    </nav>
  );
};
export default PaginationList;
