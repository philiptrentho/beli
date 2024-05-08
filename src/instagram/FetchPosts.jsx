import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Posts() {
    const [posts, setPosts] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const accessToken = location.state?.accessToken;

    useEffect(() => {
        if (accessToken) {
            axios.get(`https://graph.instagram.com/me/media?fields=id,caption,timestamp&access_token=${accessToken}`)
                .then(response => {
                    setPosts(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching posts', error);
                });
        }
    }, [accessToken]);



    // Function to navigate to GPTForm with posts
    const handleAnalyzePosts = () => {
        navigate('/chat', { state: { posts } });
    };


    useEffect(() => {
        if (posts.length > 0) {
            handleAnalyzePosts();
        }
    }, [posts]);


}

export default Posts;
