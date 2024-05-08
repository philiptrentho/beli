import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


require('dotenv').config();

function Auth() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            axios({
                method: 'post',
                url: CLOUD_FUNCTION_URL,
                data: {
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    redirect_uri: REDIRECT_URI,
                    code: code,
                },
            })
                .then(response => {
                    console.log(response);
                    // Assuming the function responds with the access token directly
                    // Navigate to /posts and pass the access token
                    navigate(`/posts`, { state: { accessToken: response.data.accessToken } });
                })
                .catch(error => {
                    console.error('Error fetching auth token', error);
                    setError('Failed to authenticate. Please try again.');
                });
        }
    }, [navigate]);

}

export default Auth;
