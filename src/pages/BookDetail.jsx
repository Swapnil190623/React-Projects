import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import firebase from "firebase/compat/app";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate } from "react-router-dom";

function BookDetail() {

  const navigate = useNavigate()
  const handleBuyBook = () => {
    if (!firebase.isLoggedIn) {
      navigate("/login", {
        state: { message: "Please log in to purchase a book." },
      });
      return;
    }

    // Handle purchase logic here
    console.log("Purchase book with ID:", bookId);
  };
  const params = useParams();
  const firebase = useFirebase();
  console.log(params);

  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const [qty, setQty] = useState(1);

  const placeOrder = async () => {
    const result = await firebase.placeOrder(params.bookId, qty);
    console.log("Order Is Placed ...", result);

    alert("Your Order Is Placed 😊");
  };

  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value.data()));
  }, []);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      firebase.getImageURL(imageURL).then((url) => setURL(url));
    }
  }, [data]);

  if (data == null) return <h2> Loading Your Data....</h2>;
  return (
    <div className="container mt-5">
      <h1 className="text-3xl font-bold mb-5">{data.name}</h1>
      <img className="rounded-xl shadow-lg" src={url} alt="" width="400px" />
      <h2 className="text-lg font-medium mt-4">Details of Book :</h2>
      <p className="text-lg font-medium"> Book Name : {data.name}</p>
      <p className="text-lg font-medium"> Book ISBN : {data.isbn}</p>
      <p className="text-lg font-medium">Price : Rs.{data.price}</p>
      <h4 className="text-lg font-medium">Publisher Details :</h4>
      <p className="text-lg font-medium">Email : {data.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="text-lg font-medium">Quantity :</Form.Label>
        <Form.Control
          type="number"
          placeholder="Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
      </Form.Group>

      <Button
        className="p-3 rounded-2xl mt-2 shadow-lg text-xl"
        onClick={handleBuyBook}
        variant="dark"
         // Disable button if not logged in
      >
        {firebase.isLoggedIn ? "Buy Now" : "Login to Buy"}
      </Button>
    </div>
  );
}

export default BookDetail;
