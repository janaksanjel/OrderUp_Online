import React, { useState } from "react";
import axios from "axios"; // Ensure axios is installed
import "./Add.css";

function Add() {
  // State to hold form data
  const [subAdminName, setSubAdminName] = useState("");
  const [subAdminPassword, setSubAdminPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form input changes
  const handleNameChange = (e) => {
    setSubAdminName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setSubAdminPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subAdminName || !subAdminPassword) {
      setError("Both fields are required!");
      return;
    }

    try {
      // Send only SubAdminName and SubAdminPassword, no need for SubAdminId
      const response = await axios.post(
        "http://localhost:4000/api/subadmin/add",
        {
          SubAdminName: subAdminName,
          SubAdminPassword: subAdminPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "Subadmin added successfully") {
        setSuccessMessage(response.data.message);
        setError(""); // Clear any previous errors
        setSubAdminName("");
        setSubAdminPassword(""); // Clear form after success
      } else {
        setError(response.data.message || "Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error adding subadmin:", error.response || error);
      setError(
        error.response?.data?.message ||
          "Error adding subadmin, please try again."
      );
    }
  };

  return (
    <div className="add-container">
      <h2>Add New Sub Admin</h2>

      {/* Show success or error message */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Form to add subadmin */}
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-group">
          <label htmlFor="subAdminName">Sub Admin Name:</label>
          <input
            type="text"
            id="subAdminName"
            value={subAdminName}
            onChange={handleNameChange}
            placeholder="Enter sub admin name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subAdminPassword">Sub Admin Password:</label>
          <input
            type="password"
            id="subAdminPassword"
            value={subAdminPassword}
            onChange={handlePasswordChange}
            placeholder="Enter sub admin password"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Sub Admin
        </button>
      </form>
    </div>
  );
}

export default Add;
