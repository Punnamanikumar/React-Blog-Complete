import React from "react";
import Header from "./others/Header.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home.jsx";
import PageNotFound from "./others/PageNotFound.jsx";
import ViewData from "./viewdata/ViewData.jsx";
import AboutUs from "./about/AboutUs.jsx";
import ViewCategory from "./viewdata/ViewCategory.jsx";
import Login from "./auth/Login.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const AllComponents = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={user?.role === 'admin' ? <Dashboard /> : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '6rem', marginBottom: '10px' }}>🔒</div>
              <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: '0 0 10px 0', color: '#111' }}>403</h1>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: '0 0 15px 0', color: '#333' }}>Not Authorized</h2>
              <p style={{ color: '#888', fontSize: '1.1rem', maxWidth: '400px', marginBottom: '30px' }}>
                You need to be logged in as an <strong>Admin</strong> to access this page.
              </p>
              <a href="/login" style={{ backgroundColor: '#111', color: 'white', padding: '12px 30px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem', transition: 'background 0.2s' }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#e00'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#111'}>
                Go to Login
              </a>
            </div>
          )} />
          <Route path="/:category" element={<ViewCategory />} />

          <Route path="/:category/:slug" element={<ViewData />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AllComponents;
