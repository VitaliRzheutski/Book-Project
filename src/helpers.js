import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export const renderBooks = (
  currentPosts,
  allBooks,
  isFilteredByPageCount = false
) => {
  let renderedBooks = !isFilteredByPageCount ? currentPosts : allBooks;

  return renderedBooks.map((book, id) => {
    const bookPrice = book.saleInfo.listPrice
      ? book.saleInfo.listPrice.amount + book.saleInfo.listPrice.currencyCode
      : null;
    const pages = book.volumeInfo.pageCount;
    const publishedDate = book.volumeInfo.publishedDate;
    let categories = book.volumeInfo.categories;

    return (
      <div container className="containerForBooks" key={book.id}>
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
                ? categories.map((category, id) => {
                    return <p key={id}>Categories: {category}</p>;
                  })
                : null}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  });
};
