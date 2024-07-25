import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

// Assuming Firebase context

function MyNavbar() {
  const firebase = useFirebase();

  

  return (
    <>
      <Navbar className="bg-zinc-900 p-4 shadow-xl" data-bs-theme="dark">
        <Container className="text-lg text-indigo-200 hover:text-white">
          <Navbar.Brand href="/" className="text-3xl">
            Boookify
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book/list">Add_New_Book</Nav.Link>
            <Nav.Link href="/book/orders">Orders</Nav.Link>
            {firebase.isLoggedIn && (
               <Nav.Link href="/account">My Account </Nav.Link>
            )}
           
          </Nav>
          {!firebase.isLoggedIn && ( // Show button only if not logged in
            <NavLink to="/login" className="btn btn-outline-light">
              Log In
            </NavLink>
          )}

          {firebase.isLoggedIn && ( // Show AccountDropdown if logged in
            <button onClick={firebase.handleSignOut}>Log out</button>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
