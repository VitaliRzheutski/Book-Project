import React, { useState } from "react";
import BooksForSale from "./BookForSale";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import FilterByCategory from "./FilterByCategory";

const AllBooks = (props) => {
  const [isForSale, setForSale] = useState(false);
  const [isFilteredByCategory, setFilteredByCategory] = useState(false);
  const [selectedOption, setOption] = useState("All");
  const categoriesObj = {};
  const booksArr = props.books;
  let booksLength = booksArr.length;
  console.log("!:", booksLength);
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

  return (
    <div className="wrapper">
      {/* <h1>{booksLength} books matched in your search</h1> */}

      <div className="buttons">
        <div className="allBooksButton">
          <Button
            type="input"
            variant="contained"
            size="small"
            onClick={() => setForSale(false)}
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
                  <div container className="containerForBooks">
                    <Card sx={{ maxWidth: 345 }} className="singleBook">
                      <CardMedia
                        component="img"
                        height="230"
                        src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                        alt={book.volumeInfo.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {book.volumeInfo.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {bookPrice ? <p>Price: {bookPrice}</p> : null}
                          <p>Pages: {pages}</p>
                          <p key={id}>Categories: {categories}</p>
                          <p>Published:{publishedDate}</p>
                          {categories
                            ? categories.map((category) => {
                                return <p key={id}>Categories: {category}</p>;
                              })
                            : null}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
