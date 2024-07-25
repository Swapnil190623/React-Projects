import React from "react";
import { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import { Row, Col } from "react-bootstrap";

function Home() {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, []);

  // Checking the user auth before buying the book
  const handleBuyBook = (bookId) => {
    // Check if user is logged in
    if (!firebase.isLoggedIn) {
      // Redirect to login page with a message
      navigate("/login", { state: { message: "Please log in to purchase a book." } });
      return; // Prevent further execution for non-logged-in users
    }

    // Handle purchase logic (replace with your actual purchase implementation)
    console.log(`User is logged in, handle book purchase: ${bookId}`); // Placeholder for actual purchase
  };

  return (
    <div className="container mt-4">
      <Row xs={1} md={2} lg={4} className="g-4"> {/* Grid configuration for 4 cards per row */}
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
