import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
//// Components and pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Account from ".//pages/Account";
import MyNavbar from "./components/Navbar";
import ListingPage from "./pages/List";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import ViewOrders from "./pages/ViewOrders";

import { Footer } from "./components/Footer";


function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />

        <Route path="/book/list" element={<ListingPage />} />
        <Route path="/book/orders" element={<ViewOrders />} />
        <Route path="/book/view/:bookId" element={<BookDetail />} />
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
