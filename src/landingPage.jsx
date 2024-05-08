import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';


const CLIENT_ID = '769532785276505';
const REDIRECT_URI = 'https://beli-app.web.app/auth';

function MainComponent() {
    const navigate = useNavigate();

    const handleConvert = () => {
        const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
        window.location.href = authUrl;
    };

    const navGPT = () => {
        console.log('Going to gpt');
        navigate('/chat');
    };

    return (
        <div className="App">
            <div className="container">
                <div className="imageColumn">
                    <img src="/image.png" className="iphoneFrame" />
                </div>
                <div className="textColumn">
                    <div className="verticalCenter">
                        <div className="header">
                            <h1>Convert your Food Finsta into a list</h1>
                        </div>
                        <div className="content">
                            <button onClick={handleConvert} className="convertButton">
                                Let's Go
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainComponent;
