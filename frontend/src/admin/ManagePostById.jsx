import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminNav from "./admin-nav";
import "../assets/css/details.css";
import { TiTick } from "react-icons/ti";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ManagePostById() {
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  if(token != "adminAuthenticated") navigate("/Knowfinity/admin/login");

  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`/api/posts/details/${id}`);
        setPost(response.data.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleApprove = async () => {
    try {
      const response = await axios.post(`/api/admin/posts/approve`, { id });
      if (response.data.success) {
        alert("Post approved successfully!");
        navigate("/Knowfinity/admin/posts");
      }
    } catch (error) {
      console.error("Error approving the post:", error);
      alert("Failed to approve the post.");
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.post(`/api/admin/posts/reject`, { id });
      if (response.data.success) {
        alert("Post rejected successfully!");
        navigate("/Knowfinity/admin/posts");
      }
    } catch (error) {
      console.error("Error rejecting the post:", error);
      alert("Failed to reject the post.");
    }
  };

  return (
    <>
      <AdminNav />
      <div className="details-container">
        {loading ? (
          <p>Loading the post...</p>
        ) : (
          post && (
            <div className="details-card">
              {post.image && (
                <img src={`/images/posts/${post.image}`} alt={post.title} className="details-image" />
              )}
              <h2 className="details-title">{post.title}</h2>
              <p className="details-description">{post.description}</p>
              <div className="details-meta">
                <span>By: {post.author}</span>
                <span>
                  Posted on: {" "}
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              {/* Buttons for Approve and Reject */}
              <div className="mt-3 d-flex gap-3">
                <button onClick={handleApprove} className="approve-button btn btn-success">
                  Approve <TiTick />
                </button>
                <button onClick={handleReject} className="reject-button btn btn-danger">
                  Reject <MdOutlineCancel />
                </button>
              </div>

            </div>
          )
        )}
      </div>
    </>
  );
}

export default ManagePostById;
