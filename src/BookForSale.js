import React, { useState } from "react";

const BooksForSale = (props) => {
  let booksForSale = props.booksForSale;

  const [isFilteredLowHigh, setFilterLowHeigh] = useState(false);

  let filteredBooksByPricesLowToHigh = booksForSale.sort(
    (book1, book2) =>
      book1.saleInfo.listPrice.amount < book2.saleInfo.listPrice.amount
  );

  let filteredBooksByPricesHighToLow = booksForSale.sort((book1, book2) => {
    return book2.saleInfo.listPrice.amount - book1.saleInfo.listPrice.amount;
  });

  const renderAllBooks = (filteredBooks) => {
    return (
      <ul>
        {filteredBooks.map((book, id) => {
          const bookPrice = book.saleInfo.listPrice
            ? book.saleInfo.listPrice.amount +
              book.saleInfo.listPrice.currencyCode
            : null;
          const pages = book.volumeInfo.pageCount;
          const tittle = book.volumeInfo.title;
          const publishedDate = book.volumeInfo.publishedDate;
          const categories = book.volumeInfo.categories;

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
                <div>
                  {/* {categories
              ? categories.map((category) => {
                  if (!categoriesObj[category]) {
                    categoriesObj[category] = [book];
                  } else {
                    categoriesObj[category].push(book);
                  }
                  console.log("categoriesObj:", categoriesObj);
                  return <p key={id}>Categories: {category}</p>;
                })
              : null} */}
                </div>

                <p>Published:{publishedDate}</p>
              </div>
            </div>
          );
        })}
      </ul>
    );
  };
  return (
    <div>
      <button
        type="submit"
        onClick={() => {
          setFilterLowHeigh(true);
        }}
      >
        Filter by price Low - High
      </button>

      <button type="submit" onClick={() => setFilterLowHeigh(false)}>
        Filter by price High - Low
      </button>

      {isFilteredLowHigh === true
        ? renderAllBooks(filteredBooksByPricesLowToHigh)
        : renderAllBooks(filteredBooksByPricesHighToLow)}
    </div>
  );
};

export default BooksForSale;
