import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState({ items: [] });
  const [isForSale, setForSale] = useState(false);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  let URL_API = "https://www.googleapis.com/books/v1/volumes";

  const getAllBooks = async () => {
    const result = await axios.get(`${URL_API}?q=${searchTerm}`);
    setBooks(result.data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getAllBooks();
  };

  let booksArr = books.items;

  let booksForSale = booksArr.filter(
    (book) => book.saleInfo.saleability === "FOR_SALE"
  );
  console.log("isForSaleBefore:", isForSale);

  const renderBooks = (books) => {
    return books.map((book, id) => {
      const bookPrice = book.saleInfo.listPrice
        ? book.saleInfo.listPrice.amount + book.saleInfo.listPrice.currencyCode
        : null;
      const pages = book.volumeInfo.pageCount;
      const tittle = book.volumeInfo.title;
      const publishedDate = book.volumeInfo.publishedDate;
      // let categories = book.volumeInfo.categories;
      // console.log("categories:", categories);

      return (
        <div key={id}>
          <img
            alt={book.volumeInfo.title}
            src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
          />
          <div>
            <h3>{tittle}</h3>
            <p>Price: {bookPrice}</p>
            <p>Pages: {pages}</p>
            {/* <div> */}
            {/* {categories.map((category) => {
                return <p>Categories: {category}</p>;
              })}
            </div> */}

            <p>Published:{publishedDate}</p>
          </div>
        </div>
      );
    });
  };

  // console.log("booksForSale:", booksForSale);
  // const filteredBooksByPricesLowToHigh = booksForSale.sort((book1, book2) => {
  //   return book1.saleInfo.listPrice.amount - book2.saleInfo.listPrice.amount;
  // });
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Search for books</span>
          <input
            type="search"
            placeholder="Search for books..."
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </label>
      </form>

      <button type="submit" onClick={() => setForSale(true)}>
        All books
      </button>

      <button type="submit" onClick={() => setForSale(true)}>
        Books for sale
      </button>

      <ul>{isForSale ? renderBooks(booksForSale) : renderBooks(booksArr)}</ul>
    </section>
  );
}

export default App;
