import React from "react";
import { Link } from "react-router-dom";

function AdminNav() {
  return (
    <nav style={navStyle}>
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link to="/Knowfinity/admin/dashboard" style={linkStyle}>Dashboard</Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/Knowfinity/admin/users" style={linkStyle}>Manage Users</Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/Knowfinity/admin/posts" style={linkStyle}>Manage Posts</Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/Knowfinity/admin/contactus" style={linkStyle}>Manage Contact-us Data</Link>
        </li>
        <li style={navItemStyle}>
          <button className="btn btn-danger" onClick={() => {
            localStorage.clear();
            window.location.href = "/Knowfinity/admin/login";
          }}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

// Styles
const navStyle = {
  backgroundColor: "#1e1e1e",
  padding: "15px",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const navListStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  listStyle: "none",
  margin: 0,
  padding: 0,
};

const navItemStyle = {
  padding: "10px",
};

const linkStyle = {
  textDecoration: "none",
  color: "#00d09c",
  fontSize: "18px",
  fontWeight: "bold",
};

export default AdminNav;
