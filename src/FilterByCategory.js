import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const FilterByCategory = (props) => {
  let categories = props.categoriesObj;
  let booksCategories = Object.entries(categories);
  return booksCategories.map((category) => {
    let nameCategory = category[0];
    let books = category[1];
    return (
      <div>
        <ul>
          <h1>Category: {nameCategory} </h1>
          <li className="sortByCategory">
            {books.map((book, id) => {
              const bookPrice = book.saleInfo.listPrice
                ? book.saleInfo.listPrice.amount +
                  book.saleInfo.listPrice.currencyCode
                : null;
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
                        <p>Pages: {book.volumeInfo.pageCount}</p>
                        <p key={id}>Categories: {book.volumeInfo.categories}</p>
                        <p>Published:{book.volumeInfo.publishedDate}</p>
                      </Typography>
                    </CardContent>
                  </Card>
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
