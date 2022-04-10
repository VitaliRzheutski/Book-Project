import React from "react";

const FilterByCategory = (props) => {
  let categories = props.categoriesObj;
  let booksCategories = Object.entries(categories);
  return booksCategories.map((category) => {
    let nameCategory = category[0];
    let books = category[1];
    return (
      <div>
        <ul>
          <li className="sortByCategory">
            {nameCategory}{" "}
            {books.map((book, id) => {
              return (
                <div key={id}>
                  <img
                    alt={book.volumeInfo.title}
                    src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                  />
                  <p>Name: {book.volumeInfo.title}</p>
                  <p>Pages: {book.volumeInfo.pageCount}</p>
                  <p>Published: {book.volumeInfo.publishedDate}</p>
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  });
};
export default FilterByCategory;
