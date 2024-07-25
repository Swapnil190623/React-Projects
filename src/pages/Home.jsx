import React from "react";
import { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import CardGroup from "react-bootstrap/CardGroup";

function Home() {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, []);


  //cheking the user auth before buying the book ..
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
    <div className="container mt-4 ">
      <CardGroup className="">
        {books.map((book) => (
          <BookCard

          
            link={`/book/view/${book.id}`}
            key={book.id}
            id={book.id}
            {...book.data()}
            onBuy={() => handleBuyBook(book.id)}
            
          />
        ))}
      </CardGroup>
    </div>
  );
}

export default Home;
