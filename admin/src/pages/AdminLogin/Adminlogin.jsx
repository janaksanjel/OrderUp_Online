import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Adminlogin.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SuperAdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const superAdminId = localStorage.getItem("superAdminId");
    if (superAdminId) {
      navigate("/dashboard"); // Redirect to dashboard if superAdmin is already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/superadmin/login",
        {
          SuperAdminName: username,
          SuperAdminPassword: password,
        }
      );

      if (response.data.superAdmin) {
        // Store superAdminId and name in local storage
        localStorage.setItem("superAdminId", response.data.superAdmin._id);
        localStorage.setItem(
          "superAdminName",
          response.data.superAdmin.SuperAdminName
        );

        // Redirect to dashboard or another page
        navigate("/dashboard");

        toast.success("Welcome back to your Super Admin Dashboard!");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg || "Login failed. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer /> {/* ToastContainer for notifications */}
      <div className="login-card">
        <div className="card-header">
          <div className="log">Super Admin Login</div>
        </div>
        <form onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              required
              name="username"
              id="username"
              type="text"
              placeholder="Enter super admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              required
              name="password"
              id="password"
              type="password"
              placeholder="Enter super admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="submit-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SuperAdminLogin;
