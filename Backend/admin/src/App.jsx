import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes, useNavigate } from "react-router-dom"; // Import useNavigate to handle redirection
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Order from "./pages/Order/Order";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./pages/Footer/Footer";
import UserInfo from "./pages/UserInfo/UserInfo";
import Adminlogin from "./pages/AdminLogin/Adminlogin";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const url = "https://orderup-backend.onrender.com";
  const footer = "Design and Developed By Janak Sanjel.";
  const navigate = useNavigate();

  useEffect(() => {
    // Check if subAdminId is in local storage
    const subAdminId = localStorage.getItem("subAdminId");

    // If subAdminId does not exist, redirect to login
    if (!subAdminId && window.location.pathname !== "/") {
      navigate("/");
    }
  }, [navigate]);

  const isLoggedIn = !!localStorage.getItem("subAdminId"); // Check if the user is logged in

  return (
    <>
      <div>
        <ToastContainer />
        <Navbar />

        <div className="app-content">
          {isLoggedIn && <Sidebar />}{" "}
          {/* Conditionally render Sidebar if user is logged in */}
          <Routes>
            <Route path="/" element={<Adminlogin />} />
            <Route
              path="/add"
              element={isLoggedIn ? <Add url={url} /> : <Adminlogin />}
            />
            <Route
              path="/list"
              element={isLoggedIn ? <List url={url} /> : <Adminlogin />}
            />
            <Route
              path="/order"
              element={isLoggedIn ? <Order url={url} /> : <Adminlogin />}
            />
            <Route
              path="/users"
              element={isLoggedIn ? <UserInfo url={url} /> : <Adminlogin />}
            />
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard url={url} /> : <Adminlogin />}
            />
            {/* <Route path='/dashboard' element={isLoggedIn ? <Sidebar /> : <Adminlogin />} /> */}
          </Routes>
        </div>

        <Footer footer={footer} />
      </div>
    </>
  );
}

export default App;
