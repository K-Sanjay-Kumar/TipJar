import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "./admin-nav";
import { useNavigate } from "react-router-dom";

function ManagePosts() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    if (token !== "adminAuthenticated") navigate("/Knowfinity/admin/login");

    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    useEffect(() => {
        axios
            .get("/api/admin/posts")
            .then(response => setPosts(response.data))
            .catch(error => console.error("Error fetching posts:", error));
    }, []);

    const filteredPosts = posts.filter(post =>
        post.token?.toString().includes(searchQuery) || post._id?.toString().includes(searchQuery)
    );

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const truncateText = (text, maxLength) => {
        if (!text) return "";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    return (
        <>
            <AdminNav />
            <div style={containerStyle}>
                <h1 style={titleStyle}>Manage Posts</h1>

                <div className="text-center">
                    <input type="text" placeholder="Search by token or ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={searchInputStyle} />
                </div>

                <table style={tableStyle}>
                    <thead>
                        <tr className="text-center">
                            <th style={thTdStyle}>ID</th>
                            <th style={thTdStyle}>Token</th>
                            <th style={thTdStyle}>Author</th>
                            <th style={thTdStyle}>Title</th>
                            <th style={thTdStyle}>Description</th>
                            <th style={thTdStyle}>Likes</th>
                            <th style={thTdStyle}>Views</th>
                            <th style={thTdStyle}>Status</th>
                            <th style={thTdStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map((post) => (
                            <tr key={post._id}>
                                <td style={thTdStyle}>{post._id}</td>
                                <td style={thTdStyle}>{post.token}</td>
                                <td style={thTdStyle}>{post.author}</td>
                                <td style={thTdStyle}>{truncateText(post.title, 20)}</td>
                                <td style={thTdStyle}>{truncateText(post.description, 30)}</td>
                                <td style={thTdStyle}>{post.likes}</td>
                                <td style={thTdStyle}>{post.views}</td>
                                <td 
                                    style={{
                                        ...thTdStyle,
                                        color: post.status === "pending" ? "orange" : post.status === "approved" ? "green" : "red",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {post.status}
                                </td>
                                <td>
                                    <button style={viewButtonStyle} onClick={() => window.location.href = `/Knowfinity/admin/post/${post._id}`}>
                                        View
                                    </button>
                                    <button style={deleteButtonStyle}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={paginationStyle}>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            style={paginationButtonStyle}
                            onClick={() => setCurrentPage(index + 1)}
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

const containerStyle = { padding: "20px", backgroundColor: "#121212", minHeight: "100vh" };
const titleStyle = { color: "#00d09c", textAlign: "center" };
const tableStyle = { width: "100%", color: "#fff", marginTop: "20px", borderCollapse: "collapse", border: "1px solid white" };
const viewButtonStyle = { backgroundColor: "#5bc0de", color: "#fff", padding: "5px 10px", border: "none", marginRight: "10px", cursor: "pointer" };
const deleteButtonStyle = { backgroundColor: "#d9534f", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer" };
const paginationStyle = { marginTop: "20px", textAlign: "center" };
const paginationButtonStyle = { backgroundColor: "#5bc0de", color: "#fff", margin: "5px", border: "none", padding: "5px 10px" };
const searchInputStyle = { margin: "20px 0", padding: "8px", width: "50%", border: "1px solid #00d09c" };
const thTdStyle = { border: "1px solid white", padding: "10px" };

export default ManagePosts;
