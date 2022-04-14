import React from "react";

const PaginationList = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
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
