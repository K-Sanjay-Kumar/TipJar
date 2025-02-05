import React, { useEffect, useState } from "react";
import AdminNav from "./admin-nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
    const navigate = useNavigate();
    const token=localStorage.getItem("token");
    if(token != "adminAuthenticated") navigate("/Knowfinity/admin/login");

    // State for statistics
    const [stats, setStats] = useState({
        users: 0,
        totalPosts: 0,
        pendingPosts: 0,
        acceptedPosts: 0,
    });

    // Simulated API Call for Data
    useEffect(() => {
        const fetchStats = async () => {
            try {
              const response = await axios.get("/api/admin/stats");
              setStats(response.data);
            } catch (error) {
              console.error("Error fetching admin statistics:", error);
            }
          };
          fetchStats();
    }, []);

    return (
        <>
        <AdminNav />
        <div style={containerStyle}>
            <h1 style={titleStyle}>Admin Dashboard</h1>

            {/* Statistics Section */}
            <div style={gridStyle}>
                <StatCard label="Total Users" value={stats.users} />
                <StatCard label="Total Posts" value={stats.totalPosts} />
                <StatCard label="Pending Posts" value={stats.pendingPosts} />
                <StatCard label="Accepted Posts" value={stats.acceptedPosts} />
            </div>
        </div>
        </>
    );
}

const StatCard = ({ label, value }) => (
    <div style={statCardStyle}>
        <h3 style={{ color: "#fff" }}>{label}</h3>
        <p style={{ fontSize: "24px", color: "#00d09c" }}>{value}</p>
    </div>
);

// Styles
const containerStyle = {
    backgroundColor: "#121212",
    color: "#fff",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
};

const titleStyle = {
    textAlign: "center",
    color: "#00d09c",
};

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
};

const statCardStyle = {
    backgroundColor: "#1e1e1e",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
};

const menuStyle = {
    marginTop: "40px",
    textAlign: "center",
};

const navLinkStyle = {
    display: "inline-block",
    backgroundColor: "#00d09c",
    color: "#121212",
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    margin: "10px",
    fontWeight: "bold",
};

export default Dashboard;
