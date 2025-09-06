import React from 'react';
import Navbar from "../components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import DetailProfile from '../pages/DetailProfile.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import YourProfile from '../pages/YourProfile.jsx';

function MainLayout() {
  return (
    <main>
      <div className='mb-8'>
      <Navbar />
      </div>
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/yourProfile" element={<YourProfile />} />

        
        <Route path="/profile/:id" element={<DetailProfile />} />

        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  );
}

export default MainLayout;