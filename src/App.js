import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import AllBooks from "./AllBooks";
import { Button, TextField } from "@mui/material";

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
      <h1>Search for books</h1>
      <form onSubmit={handleSubmit} className="searchForBooks">
        <label className="searchBlock">
          <TextField
            type="search"
            placeholder="Search for books..."
            value={searchTerm}
            onChange={handleChange}
            id="outlined-basic"
            variant="outlined"
            size="small"
          />
          <Button type="input" variant="contained" size="large">
            Search
          </Button>
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
