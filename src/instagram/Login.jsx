import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const CLIENT_ID = '';
const REDIRECT_URI = 'https://beli-app.web.app/auth';

function Login() {
    const handleLogin = () => {
        const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
        window.location.href = authUrl;
    };

}

export default Login;
