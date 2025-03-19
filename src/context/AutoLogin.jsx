import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';


const AutoLogin = ({ setAuthenticated ,setisLogin}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.log('No access token found');
      return;
    }

    try {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000; // Get current time in seconds

      if (decodedToken.exp < currentTime) {
        console.log('Token expired, please log in again.');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return;
      }

      console.log('User auto-logged in.');
      setAuthenticated(true);
      setisLogin(true)  // Set user as authenticated
      navigate('/dashboard');  // Redirect to dashboard

    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, [setAuthenticated, navigate]);

  return null;
};

export default AutoLogin;
