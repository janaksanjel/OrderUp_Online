import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StoreContex } from '../../Context/StoreContex';

import { assets } from '../../assets/assets';
import './LoginPopup.css';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPopup = ({ setshowlogin }) => {
    const { url, settoken } = useContext(StoreContex);
    const [currentState, setcurrentState] = useState('login');
    const [data, setdata] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onchangeHandeler = (event) => {
        const { name, value } = event.target;
        setdata({ ...data, [name]: value });
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newURL = `${url}/api/user/`;

        try {
            if (currentState === 'login') {
                newURL += 'login';
                // toast.success("Logged in successfully!");
            } else {
                newURL += 'register';
                toast.success("Your account has been created successfully.");
            }

            const response = await axios.post(newURL, data);
            const { token } = response.data;

            if (token) {
                settoken(token);
                localStorage.setItem('token', token);
                setshowlogin(false);
                toast.success(`Welcome back!`);
               
            } else {
                // alert('Authentication Failed');
                toast.error("User Not Found!");
            }
        } catch (error) {
            console.error('Error during login/register request:', error);
            alert('Server Error');
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h1>{currentState === 'login' ? 'Login' : 'Sign Up'}</h1>
                    <img onClick={() => setshowlogin(false)} src={assets.cross_icon} alt='' />
                </div>

                <div className='login-popup-inputs'>
                    {currentState !== 'login' && (
                        <input
                            name='name'
                            onChange={onchangeHandeler}
                            value={data.name}
                            type='text'
                            placeholder='Your Name'
                            required
                        />
                    )}
                    <input
                        name='email'
                        onChange={onchangeHandeler}
                        value={data.email}
                        type='email'
                        placeholder='Your Email'
                        required
                    />
                    <input
                        name='password'
                        onChange={onchangeHandeler}
                        value={data.password}
                        type='password'
                        placeholder='Password'
                        required
                    />
                </div>

                <button type='submit'>
                    {currentState === 'login' ? 'Login' : 'Create Account'}
                </button>

                <div className='login-popup-condition'>
                    <input type='checkbox' required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {currentState === 'login' ? (
                    <p>
                        Create an account?{' '}
                        <span onClick={() => setcurrentState('signup')}>Click here</span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{' '}
                        <span onClick={() => setcurrentState('login')}>Login here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
