import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <div className="ht1" style={{ display: 'flex', justifyContent: 'center', padding: '20px 0', marginLeft: '0' }}>
        <NavLink to="/home" className="headersiren" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'black', position: 'relative' }}>
          <span style={{ transform: 'rotate(-90deg)', fontWeight: '800', fontSize: '22px', display: 'inline-block', marginRight: '-12px', marginTop: '10px' }}>The</span>
          <span style={{ fontSize: '65px', fontWeight: '900', letterSpacing: '-2px' }}>Siren</span>
        </NavLink>
      </div>
      <div className="menu">
        <label htmlFor="check" ><i className="fas fa-bars"></i></label>
      </div>
      <div className="nav">
        <input type="checkbox" id="check" />
        <div className="nav-item flex">
            <div><NavLink to="/home" style={({ isActive }) => { return {color: isActive ? "red" : "Black",textDecoration: "none",} }}> Home </NavLink></div>    
            <div><NavLink to="/tollywood" style={({ isActive }) => { return {color: isActive ? "red" : "Black",textDecoration: "none",} }}> Tollywood </NavLink></div>
            <div><NavLink to="/technology" style={({ isActive }) => { return {color: isActive ? "red" : "Black",textDecoration: "none",} }}> Technology </NavLink></div>    
            <div><NavLink to="/jobs" style={({ isActive }) => { return {color: isActive ? "red" : "Black",textDecoration: "none",} }}> Jobs </NavLink></div>
            <div><NavLink to="/nature" style={({ isActive }) => { return {color: isActive ? "red" : "Black",textDecoration: "none",} }}> Nature </NavLink></div>    
            <div><NavLink to="/about" style={({ isActive }) => { return {color: isActive ? "red" : "Black",textDecoration: "none",} }}> About Us </NavLink></div>
            {user ? (
              <>
                <div><NavLink to="/dashboard" style={({ isActive }) => { return {color: isActive ? "red" : "Black",textDecoration: "none",} }}> Dashboard </NavLink></div>
                <div><button onClick={logout} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px'}}>Logout</button></div>
              </>
            ) : (
              <div><NavLink to="/login" style={({ isActive }) => { return {color: isActive ? "red" : "Black",textDecoration: "none",} }}> Login </NavLink></div>
            )}
        </div>
      </div>

      <hr />
    </div>
  );
};

export default Header;
