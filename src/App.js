import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import AllBooks from "./AllBooks";
import { Button, TextField } from "@mui/material";
import { readFromCache, writeToCache } from "./cache";
import PaginationList from "./Pagination";

// function App() {
function App({ useCache }) {
  // console.log("useCache", { useCache });
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState({ items: [] });
  let URL_API = "https://www.googleapis.com/books/v1/volumes";

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getFreshData = async (URL_API, cacheResponse = false, searchTerm) => {
    const { data } = await axios.get(
      `${URL_API}?q=${searchTerm}&maxResults=40`
    );
    cacheResponse && writeToCache(searchTerm, data);
    return data;
  };

  const getCachedData = (searchTerm) => readFromCache(searchTerm);
  const getAllBooks = async () => {
    setBooks({ items: [] }); //might come back
    if (useCache) {
      const cachedBooks = getCachedData(searchTerm);
      if (cachedBooks) {
        console.log("!!!!");
        setBooks(cachedBooks);
      }
    } else {
      const result = await getFreshData(URL_API, true, searchTerm);
      console.log("!result books from api", result);
      setBooks(result);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getAllBooks();
  };

  const booksArr = books.items;

  return (
    <section className="main">
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

      {booksArr.length ? <AllBooks books={booksArr} /> : null}
    </section>
  );
}

export default App;
