import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure axios is installed
import { Chart, registerables } from "chart.js";
import "./Dashboard.css";

// Register components from chart.js
Chart.register(...registerables);

function Dashboard() {
  // Initialize state
  const superAdminName = localStorage.getItem("superAdminName"); // Retrieve super admin's name from local storage
  const [subAdmins, setSubAdmins] = useState([]); // State to store subadmins
  const [loading, setLoading] = useState(true); // Loading state for API request

  // Fetch subadmins data from the backend
  useEffect(() => {
    const fetchSubAdmins = async () => {
      try {
        // Assuming the backend is running on http://localhost:5000
        const response = await axios.get(
          "https://orderup-backend.onrender.com/api/subadmin/fetch"
        );
        setSubAdmins(response.data.subadmins); // Update state with subadmins
      } catch (error) {
        console.error("Error fetching subadmins:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchSubAdmins();
  }, []); // Empty dependency array means this will run once when the component mounts

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome back, Super Admin of Order Up!</h2>
        <p>You are The Super Mr.{superAdminName}!</p>
      </div>

      {/* Loading state */}
      {loading ? (
        <div>Loading subadmins...</div>
      ) : (
        <div className="subadmins-list">
          <h3>Restaurant List</h3>
          <ul>
            {subAdmins.length > 0 ? (
              subAdmins.map((subadmin) => (
                <li key={subadmin._id}>
                  <p>Restaurant Name: {subadmin.SubAdminName}</p>
                  <p>Restaurant Password: {subadmin.SubAdminPassword}</p>
                </li>
              ))
            ) : (
              <p>No subadmins found.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
