import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/css/admin-login.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem("token", "adminAuthenticated");
      navigate("/Knowfinity/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        
        <h2 className="admin-title">Admin Login</h2>
        
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="admin-login-input" />
        
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="admin-login-input" />
        
        <button onClick={handleLogin} className="admin-login-button">
          Login
        </button>
        
        {error && <p className="admin-error-message">{error}</p>}
      
      </div>
    </div>
  );
};

export default AdminLogin;
