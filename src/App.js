import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState({ items: [] });

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  let URL_API = `https://www.googleapis.com/books/v1/volumes`;

  const getAllBooks = async () => {
    const result = await axios.get(`${URL_API}?q=${searchTerm}`);
    setBooks(result.data);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    getAllBooks();
  };
  console.log("books:", books.items);
  let booksArr = books.items;
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
      <ul>
        {booksArr.map((book, id) => {
          return (
            <div key={id}>
              <img
                alt={book.volumeInfo.title}
                src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
              />
              <div>
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.publishedDate}</p>
              </div>
            </div>
          );
        })}
      </ul>
    </section>
  );
}

export default App;
