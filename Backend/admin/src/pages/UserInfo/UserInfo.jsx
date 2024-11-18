import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserInfo.css'; // Import your custom CSS file
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import { Link } from 'react-router-dom';

function UserInfo({ url }) {
    const [users, setUsers] = useState([]); // Initialize as an empty array

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${url}/api/user/userinfo`);
            if (res.data && res.data.success) {
                setUsers(res.data.data); // Update users state with the fetched data
            } else {
                console.error('Error fetching users:', res.data.message);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const userDelete = async (userId) => {
        try {
            const res = await axios.post(`${url}/api/user/userdelete`, { _id: userId });
            await fetchUsers(); // Fetch users again after deletion
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [url]);

    return (

        <>
        {/* <div className="back-link-container">
        <Link to="/dashboard" className="back-link">Back</Link>
      </div> */}
        <div className="user-list-container">
            <h1>User Information</h1>
            <div className="user-list">
                {/* Check if users is an array before mapping */}
                {Array.isArray(users) && users.map((user, index) => (
                    <div key={index} className="user-item">
                        <div className="user-info">
                            <p><span>ID:</span> {user._id}</p>
                            <p><span>Name:</span> {user.name}</p>
                            <p><span>Email:</span> {user.email}</p>
                        </div>
                        <div className="delete-button" onClick={() => userDelete(user._id)}>
                            <span>Delete</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default UserInfo;
