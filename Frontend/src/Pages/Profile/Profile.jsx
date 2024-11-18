// Profile.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContex } from '../../Context/StoreContex';
import './Profile.css';

function Profile() {
    const { url, token } = useContext(StoreContex);
    const [data, setData] = useState(null);

    const fetchUserProfile = async () => {
        try {
            const res = await axios.post(
                `${url}/api/user/userprofile`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setData(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserProfile();
        }
    }, [token]);

    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <div className='profile'>
            <h1>Profile</h1>
          

            <div className='info'>
                <h2>User Information</h2>
                <div>
                    <label>User Id:</label>
                    <span>{data._id}</span>
                </div>
                <div>
                    <label>Username:</label>
                    <span>{data.name}</span>
                </div>
                <div>
                    <label>Email:</label>
                    <span>{data.email}</span>
                </div>
                
                {/* Add more fields as needed */}
            </div>
        </div>
    );
}

export default Profile;
