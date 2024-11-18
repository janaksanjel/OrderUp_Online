import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes, useNavigate } from "react-router-dom"; // Import useNavigate to handle redirection
import Add from "./pages/Add/Add";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./pages/Footer/Footer";
import Adminlogin from "./pages/AdminLogin/Adminlogin";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const url = "http://localhost:4000";
  const footer = "Designed and Developed by Janak Sanjel.";
  const navigate = useNavigate();

  useEffect(() => {
    // Check if superAdminId is in local storage
    const superAdminId = localStorage.getItem("superAdminId");

    // If superAdminId does not exist, redirect to login
    if (!superAdminId && window.location.pathname !== "/") {
      navigate("/");
    }
  }, [navigate]);

  const isLoggedIn = !!localStorage.getItem("superAdminId"); // Check if the super admin is logged in

  return (
    <>
      <div>
        <ToastContainer />
        <Navbar />

        <div className="app-content">
          {isLoggedIn && <Sidebar />}{" "}
          {/* Conditionally render Sidebar if super admin is logged in */}
          <Routes>
            <Route path="/" element={<Adminlogin />} />
            <Route
              path="/add"
              element={isLoggedIn ? <Add url={url} /> : <Adminlogin />}
            />

            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard url={url} /> : <Adminlogin />}
            />
          </Routes>
        </div>

        <Footer footer={footer} />
      </div>
    </>
  );
}

export default App;
