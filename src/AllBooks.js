import React, { useState } from "react";
import BooksForSale from "./BookForSale";
// import { Button } from "@mui/material";
import FilterByCategory from "./FilterByCategory";

const AllBooks = (props) => {
  const [isForSale, setForSale] = useState(false);
  const [isFilteredByCategory, setFilteredByCategory] = useState(false);
  const [selectedOption, setOption] = useState("All");
  const categoriesObj = {};
  const booksArr = props.books;
  const [allBooks, filterBooksByPageCount] = useState(booksArr);
  const firstRange = booksArr.filter(
    (book) => book.volumeInfo.pageCount > 0 && book.volumeInfo.pageCount <= 100
  );
  const secondRange = booksArr.filter(
    (book) =>
      book.volumeInfo.pageCount > 101 && book.volumeInfo.pageCount <= 200
  );
  const thirdRange = booksArr.filter(
    (book) =>
      book.volumeInfo.pageCount > 201 && book.volumeInfo.pageCount <= 300
  );
  const fourthRange = booksArr.filter(
    (book) =>
      book.volumeInfo.pageCount > 301 && book.volumeInfo.pageCount <= 400
  );

  const handleOptionChange = (changeEvent) => {
    if (changeEvent.target.value === "All") {
      filterBooksByPageCount(booksArr);
    } else if (changeEvent.target.value === "0-100 pages") {
      filterBooksByPageCount(firstRange);
    } else if (changeEvent.target.value === "101-200 pages") {
      filterBooksByPageCount(secondRange);
    } else if (changeEvent.target.value === "201-300 pages") {
      filterBooksByPageCount(thirdRange);
    } else if (changeEvent.target.value === "301-500 pages") {
      filterBooksByPageCount(fourthRange);
    }
    return setOption(changeEvent.target.value);
  };
  console.log("allbooks", allBooks);
  const booksForSale = allBooks.filter(
    (book) => book.saleInfo.saleability === "FOR_SALE"
  );

  //reconstruct to reduce
  let categories = allBooks.map((book) => {
    let category = book.volumeInfo.categories ? book.volumeInfo.categories : [];
    for (let c of category) {
      if (!categoriesObj[c]) {
        categoriesObj[category] = [book];
      } else {
        categoriesObj[category].push(book);
      }
    }
  });
  console.log("obkj", categoriesObj);

  return (
    <div>
      <button type="submit" onClick={() => setForSale(false)}>
        All books
      </button>

      <button type="submit" onClick={() => setForSale(true)}>
        Books for sale
      </button>

      <button type="submit" onClick={() => setFilteredByCategory(true)}>
        Filter by category{" "}
      </button>

      <div className="filterByPage">
        <div>
          <label>
            <input
              type="radio"
              value="All"
              checked={selectedOption === "All"}
              onChange={handleOptionChange}
            />
            All
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="0-100 pages"
              checked={selectedOption === "0-100 pages"}
              onChange={handleOptionChange}
            />
            0-100 pages
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="101-200 pages"
              checked={selectedOption === "101-200 pages"}
              onChange={handleOptionChange}
            />
            101-200 pages
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="201-300 pages"
              checked={selectedOption === "201-300 pages"}
              onChange={handleOptionChange}
            />
            201-300 pages
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="301-500 pages"
              checked={selectedOption === "301-500 pages"}
              onChange={handleOptionChange}
            />
            301-500 pages
          </label>
        </div>
      </div>
      <ul>
        {isForSale ? (
          <BooksForSale booksForSale={booksForSale} />
        ) : isFilteredByCategory ? (
          <FilterByCategory categoriesObj={categoriesObj} />
        ) : (
          allBooks.map((book, id) => {
            const bookPrice = book.saleInfo.listPrice
              ? book.saleInfo.listPrice.amount +
                book.saleInfo.listPrice.currencyCode
              : null;
            const pages = book.volumeInfo.pageCount;
            const tittle = book.volumeInfo.title;
            const publishedDate = book.volumeInfo.publishedDate;
            let categories = book.volumeInfo.categories;

            return (
              <div key={book.id}>
                <img
                  alt={book.volumeInfo.title}
                  src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                />
                <div>
                  <h3>{tittle}</h3>
                  {bookPrice ? <p>Price: {bookPrice}</p> : null}
                  <p>Pages: {pages}</p>
                  <div></div>
                  <p>Published:{publishedDate}</p>

                  <div>
                    {categories
                      ? categories.map((category) => {
                          return <p key={id}>Categories: {category}</p>;
                        })
                      : null}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default AllBooks;
