import React, { useState } from "react";
import BooksForSale from "./BookForSale";
// import { Button } from "@mui/material";

const AllBooks = (props) => {
  const [isForSale, setForSale] = useState(false);

  let booksArr = props.books;

  let booksForSale = booksArr.filter(
    (book) => book.saleInfo.saleability === "FOR_SALE"
  );

  return (
    <div>
      <button type="submit" onClick={() => setForSale(false)}>
        All books
      </button>

      <button type="submit" onClick={() => setForSale(true)}>
        Books for sale
      </button>
      <ul>
        {isForSale ? (
          <BooksForSale booksForSale={booksForSale} />
        ) : (
          booksArr.map((book, id) => {
            const bookPrice = book.saleInfo.listPrice
              ? book.saleInfo.listPrice.amount +
                book.saleInfo.listPrice.currencyCode
              : null;
            const pages = book.volumeInfo.pageCount;
            const tittle = book.volumeInfo.title;
            const publishedDate = book.volumeInfo.publishedDate;
            let categories = book.volumeInfo.categories;

            return (
              <div key={id}>
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
