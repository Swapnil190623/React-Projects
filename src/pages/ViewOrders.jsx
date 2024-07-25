import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase"; // Assuming Firebase context
import BookCard from "../components/Card"; // Assuming BookCard component
import { Link } from "react-router-dom"; // For routing

function ViewOrders() {
  const firebase = useFirebase();
  const [booksWithOrders, setBooksWithOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track any errors
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const books = await firebase.fetchMyBooks(firebase.user.uid);
        const booksWithOrders = [];
        for (const book of books.docs) {
          const orders = await firebase.getOrders(book.id);
          if (orders.docs.length > 0) {
            const purchasedBook = { ...book.data(), orders: orders.docs };
            booksWithOrders.push(purchasedBook);
          }
        }
        setBooksWithOrders(booksWithOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [firebase]);

  if (!firebase.isLoggedIn)
    return (
      <h1 className="text-2xl font-medium text-center mt-4">
        Please Login Buddy..
      </h1>
    );

  return (
    <div className="container mx-auto pt-4">
      {/* Loading state */}
      {isLoading && (
        <p className="text-2xl text-center mt-4 font-medium">
          Loading orders...
        </p>
      )}

      {/* Error state */}
      {error && <p>Error fetching orders: {error}</p>}

      {/* No orders state */}
      {booksWithOrders.length === 0 && (
        <h1 className="text-3xl mt-2 text-center font-medium">
          You Don't Have Any Orders yet
        </h1>
      )}

      {/* Orders list */}
      {booksWithOrders.length > 0 && (
        <>
          <h1 className="text-3xl mt-2 text-center font-medium">Your Orders</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
            {booksWithOrders.map((bookData) => (
              // Assuming first order

              <BookCard
                className="block"
                id={bookData.id}
                key={bookData.id}
                {...bookData}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ViewOrders;
