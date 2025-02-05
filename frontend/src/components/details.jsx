import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../constants/header";
import "../assets/css/details.css";
import { useNavigate } from "react-router-dom";

function Details() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
      if (!token) {
        navigate("/login");
      }
    }, [token, navigate]);

  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`/api/posts/details/${id}`);
        setPost(response.data.data);
        setLikes(response.data.data.likes);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`/api/posts/like`, { id });
      if (response.data.success) {
        setLikes(response.data.likes);
      }
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  return (
    <>
      <Header />
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
                  Posted on:{" "}
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>Views: {post.views}</span>
              </div>
              <button onClick={handleLike} className="like-button mt-3">
                ❤️ Like ({likes})
              </button>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Details;
