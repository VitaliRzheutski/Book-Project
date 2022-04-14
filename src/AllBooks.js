import React, { useState } from "react";
import BooksForSale from "./BookForSale";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FilterByCategory from "./FilterByCategory";
import PaginationList from "./Pagination";
import { renderBooks } from "./helpers";

const AllBooks = (props) => {
  const [isForSale, setForSale] = useState(false);
  const [isFilteredByCategory, setFilteredByCategory] = useState(false);
  const [selectedOption, setOption] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [isFilteredByPageCount, setToFilteredByPageCount] = useState(false);
  const [postsPerPage] = useState(4);
  const categoriesObj = {};
  const booksArr = props.books;
  let booksLength = booksArr.length;

  // get curent books
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = booksArr.slice(indexOfFirstPost, indexOfLastPost);
  const [allBooks, filterBooksByPageCount] = useState(currentPosts);

  const firstRange = currentPosts.filter(
    (book) => book.volumeInfo.pageCount > 0 && book.volumeInfo.pageCount <= 100
  );
  const secondRange = currentPosts.filter(
    (book) =>
      book.volumeInfo.pageCount > 101 && book.volumeInfo.pageCount <= 200
  );
  const thirdRange = currentPosts.filter(
    (book) =>
      book.volumeInfo.pageCount > 201 && book.volumeInfo.pageCount <= 300
  );
  const fourthRange = currentPosts.filter(
    (book) =>
      book.volumeInfo.pageCount > 301 && book.volumeInfo.pageCount <= 400
  );

  const handleOptionChange = (changeEvent) => {
    if (changeEvent.target.value === "All") {
      filterBooksByPageCount(currentPosts);
    } else if (changeEvent.target.value === "0-100 pages") {
      filterBooksByPageCount(firstRange);
    } else if (changeEvent.target.value === "101-200 pages") {
      filterBooksByPageCount(secondRange);
    } else if (changeEvent.target.value === "201-300 pages") {
      filterBooksByPageCount(thirdRange);
    } else if (changeEvent.target.value === "301-500 pages") {
      filterBooksByPageCount(fourthRange);
    }
    setToFilteredByPageCount(true);
    return setOption(changeEvent.target.value);
  };
  console.log("currentPost after Filter by page count", currentPosts);
  const booksForSale = allBooks.filter(
    (book) => book.saleInfo.saleability === "FOR_SALE"
  );

  //reconstruct to reduce
  // let a = allBooks
  //   ? allBooks.reduce((resObj, current) => {
  //       console.log("prev", resObj);
  //       console.log("current", current);
  //       let category = current.volumeInfo.categories
  //         ? current.volumeInfo.categories
  //         : [];
  //       console.log("category", category);
  //       if (!resObj[category]) {
  //         resObj[category] = [current];
  //       } else {
  //         resObj[category].push(current);
  //       }
  //     }, {})
  //   : {};
  // console.log("reduce obj", a);

  allBooks.forEach((book) => {
    let category = book.volumeInfo.categories ? book.volumeInfo.categories : [];
    for (let c of category) {
      if (!categoriesObj[c]) {
        categoriesObj[category] = [book];
      } else {
        categoriesObj[category].push(book);
      }
    }
  });

  //changePage
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="wrapper">
      <div className="buttons">
        <div className="allBooksButton">
          <Button
            type="input"
            variant="contained"
            size="small"
            onClick={() => {
              setFilteredByCategory(false);
              filterBooksByPageCount(currentPosts);
              return setForSale(false);
            }}
          >
            All books
          </Button>
        </div>
        <div className="forSaleBooksButton">
          <Button
            type="submit"
            variant="contained"
            size="small"
            onClick={() => setForSale(true)}
          >
            Books for sale
          </Button>
        </div>
      </div>
      <div className="filterByCategoryButton">
        <Button
          type="submit"
          variant="contained"
          size="small"
          onClick={() => setFilteredByCategory(true)}
        >
          Filter by category{" "}
        </Button>
      </div>
      <div className="filterByPageDropDown">
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="demo-simple-select-label">Filter by Page</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Filter by pages"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <MenuItem
              value="All"
              checked={selectedOption === "All"}
              onChange={handleOptionChange}
            >
              All
            </MenuItem>

            <MenuItem
              value="0-100 pages"
              checked={selectedOption === "0-100 pages"}
              onChange={handleOptionChange}
            >
              0-100 pages
            </MenuItem>
            <MenuItem
              value="101-200 pages"
              checked={selectedOption === "101-200 pages"}
              onChange={handleOptionChange}
            >
              101-200 pages
            </MenuItem>
            <MenuItem
              value="201-300 pages"
              checked={selectedOption === "201-300 pages"}
              onChange={handleOptionChange}
            >
              201-300 pages
            </MenuItem>
            <MenuItem
              value="301-500 pages"
              checked={selectedOption === "301-500 pages"}
              onChange={handleOptionChange}
            >
              301-500 pages
            </MenuItem>
          </Select>
        </FormControl>
        <h1>{booksLength} books matched in your search</h1>
        <div>
          <ul className="allBooks">
            {isForSale ? (
              <BooksForSale booksForSale={booksForSale} />
            ) : isFilteredByCategory ? (
              <FilterByCategory categoriesObj={categoriesObj} />
            ) : (
              renderBooks(currentPosts, allBooks, isFilteredByPageCount)
            )}
          </ul>
        </div>
        <PaginationList
          postsPerPage={postsPerPage}
          totalPosts={booksArr.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default AllBooks;
