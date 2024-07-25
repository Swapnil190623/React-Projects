import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, []);

  const handleBuyBook = (bookId) => {
    if (!firebase.isLoggedIn) {
      navigate("/login", {
        state: { message: "Please log in to purchase a book." },
      });
      return;
    }

    // Handle purchase logic here (e.g., redirect to checkout page or show confirmation)
    navigate(`/book/checkout/${bookId}`);
  };

  return (
    <div className="container mt-4">
      <Row xs={1} md={2} lg={4} className="g-4">
        {books.map((book) => (
          <Col key={book.id}>
            <BookCard
              link={`/book/view/${book.id}`}
              id={book.id}
              {...book.data()}
              onBuy={() => handleBuyBook(book.id)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
