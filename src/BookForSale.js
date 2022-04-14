import React, { useState } from "react";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const BooksForSale = (props) => {
  let booksForSale = props.booksForSale;

  const [isFilteredLowHight, setFilterLowHeight] = useState(false);

  let filteredBooksByPricesLowToHigh = [...booksForSale].sort(
    (book1, book2) => {
      return book1.saleInfo.listPrice.amount - book2.saleInfo.listPrice.amount;
    }
  );

  let filteredBooksByPricesHighToLow = [...booksForSale].sort(
    (book1, book2) => {
      return book2.saleInfo.listPrice.amount - book1.saleInfo.listPrice.amount;
    }
  );

  const renderAllBooks = (filteredBooks) => {
    return (
      <ul>
        {filteredBooks.map((book, id) => {
          const bookPrice = book.saleInfo.listPrice
            ? book.saleInfo.listPrice.amount +
              book.saleInfo.listPrice.currencyCode
            : null;
          const pages = book.volumeInfo.pageCount;
          const publishedDate = book.volumeInfo.publishedDate;
          const categories = book.volumeInfo.categories;

          return (
            <div container className="containerForBooks" key={id}>
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
        })}
      </ul>
    );
  };
  return (
    <div className="filterByPriceButtons">
      <Button
        type="input"
        variant="contained"
        size="small"
        onClick={() => setFilterLowHeight(true)}
      >
        Filter by price Low - High
      </Button>
      <Button
        id="heightToLowButton"
        type="input"
        variant="contained"
        size="small"
        onClick={() => setFilterLowHeight(false)}
      >
        Filter by price High - Low
      </Button>

      {isFilteredLowHight
        ? renderAllBooks(filteredBooksByPricesLowToHigh)
        : renderAllBooks(filteredBooksByPricesHighToLow)}
    </div>
  );
};

export default BooksForSale;
