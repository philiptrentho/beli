import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainComponent from './landingPage.jsx'; // Assuming MainComponent is now a separate component
import SharePage from './sharePage.jsx';
import Login from './instagram/Login.jsx';
import Auth from './instagram/Auth.jsx';
import Posts from './instagram/FetchPosts.jsx';
import GPTForm from './gptAPI.jsx';
function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/share" element={<SharePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
        {/* Assuming you have a way to pass the accessToken to Posts */}
        <Route path="/posts" element={<Posts />} />
        <Route path="/chat" element={<GPTForm />} />
      </Routes>
    </Router>
  );
}

export default App;
