import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import AllBooks from "./AllBooks";
// import { Button } from "@mui/material";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState({ items: [] });

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

  const booksArr = books.items;

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

      {booksArr.length ? (
        <div>
          <AllBooks books={booksArr} />
        </div>
      ) : null}
    </section>
  );
}

export default App;
