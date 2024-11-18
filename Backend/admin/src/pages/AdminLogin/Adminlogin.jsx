import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios'; // Import axios for making HTTP requests
import './Adminlogin.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Adminlogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To display error messages
  const navigate = useNavigate(); // Initialize useNavigate
  <ToastContainer />
  useEffect(() => {
    const subAdminId = localStorage.getItem('subAdminId');
    if (subAdminId) {
      navigate('/dashboard'); // Redirect to dashboard if already logged in
    }
   if(!subAdminId){
    navigate('/')
   }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post('http://localhost:4000/api/subadmin/login', {
        SubAdminName: username,
        SubAdminPassword: password
      });

      if (response.data.subadmin) {
        // Store subAdminId and name in local storage
        localStorage.setItem('subAdminId', response.data.subadmin._id);
        localStorage.setItem('subAdminName', response.data.subadmin.SubAdminName);

        // Redirect to dashboard or another page
        navigate('/dashboard');

       toast.success('Welcome Back Your DashBoard! ')



        // const a= localStorage.getItem('subAdminId', response.data.subadmin._id);
        // if(!a)
        //   navigate('/')
       
        
      }

     
    } catch (error) {
      setError(error.response?.data?.msg || 'Login failed. Please try again.');
    }

    
  };



  
    
    
   

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="card-header">
          <div className="log">Sub Admin Login</div>
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
              placeholder="Enter username"
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
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="submit-btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Adminlogin;
