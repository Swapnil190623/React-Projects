import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

// book listing page ...

function ListingPage() {
  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const firebase = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.createNewListing(name, isbnNumber, price, coverPic);
    setName("");
    setIsbnNumber("");
    setPrice("");
    setCoverPic("");
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <Form onSubmit={handleSubmit} className="w-50">  {/* Added class for width */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="text-xl font-medium">Book Name :</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Book Name "
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="text-xl font-medium">ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ISBN"
            value={isbnNumber}
            onChange={(e) => setIsbnNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="text-xl font-medium">Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="text-xl font-medium">Cover Pic</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setCoverPic(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={()=> alert('Order Is Placed ..')}>
          Create
        </Button>
      </Form>
    </div>
  );
}

export default ListingPage;
