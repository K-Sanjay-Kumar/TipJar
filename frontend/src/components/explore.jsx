import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../assets/css/explore.css";
import Header from "../constants/header";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function Explore() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        const acceptedPosts = response.data.filter(post => post.status === "approved");
        setPosts(acceptedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (token) fetchPosts();
  }, [token]);

  const handleScroll = (direction) => {
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const filteredData = posts.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleReadMore = async(id) => {
    try {
      axios.post(`/api/posts/views`, { id });
      navigate(`/details/${id}`);
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="explore-page">
        <div className="explore-container">
          {/* Search and Filter Section */}
          <div className="explore-controls">
            <div className="search-wrapper">
              <FaSearch className="search-icon" />
              <input
                className="explore-search form-control"
                type="text"
                placeholder="Search for a specific post..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="total-posts text-center mt-2">
            <p>Total Posts: {posts.length}</p>
          </div>

          {/* Recent Posts Section */}
          <div className="recent-updates">
            <div className="recent-post-header">
              <div className="recent-post-title">
                <h2>Recent Posts</h2>
              </div>
              <div className="scroll-buttons">
                <button onClick={() => handleScroll("left")} className="scroll-btn">{"<"}</button>
                <button onClick={() => handleScroll("right")} className="scroll-btn">{">"}</button>
              </div>
            </div>

            <div ref={scrollRef} className="recent-cards">
              {posts.slice(0, 10).map((item) => (
                <div key={item._id} className="recent-card">
                  {item.image && (
                    <img src={`/images/posts/${item.image}`} alt="" className="card-img" />
                  )}
                  {/* <h2 className="card-title">{it</h2>em.title}</h2>
                  <p className="card-description">{item.description}</p> */}
                  <h2 className="recent-post-title">
                    {item.title.split(" ").slice(0, 5).join(" ")}{item.title.split(" ").length > 5 && "..."} 
                    <span className="card-author">&nbsp; @{item.author}</span>
                  </h2>
                  <p className="recent-post-description">
                    {item.description.split(" ").slice(0, 10).join(" ")}{item.description.split(" ").length > 10 && "..."}
                  </p>

                  <p className="card-date">
                    Posted on: {new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}</p>
                  <button className="read-full-button" onClick={() => handleReadMore(item._id)}>Read Full</button>
                </div>
              ))}
            </div>
          </div>

          {/* All Posts Section */}
          <div className="all-posts mt-5">
            <h2>All Posts</h2>
            <div className="explore-cards mt-5">
              {currentPosts.length ? (
                currentPosts.map((item) => (
                  <div key={item._id} className="explore-card">
                    {/* <img src={`/src/assets/images/posts/${item.image}`} alt="" className="card-img" /> */}
                    {item.image && (
                      <img src={`/images/posts/${item.image}`} alt="" className="card-img" />
                    )}
                    {/* <h2 className="card-title">{item.title} <span className="card-author"> &nbsp; @{item.author}</span> </h2>
                    <p className="card-description">{item.description}</p> */}

                    <h2 className="card-title">
                      {item.title.split(" ").slice(0, 5).join(" ")}{item.title.split(" ").length > 5 && "..."} 
                      <span className="card-author">&nbsp; @{item.author}</span>
                    </h2>
                    <p className="card-description">
                      {item.description.split(" ").slice(0, 10).join(" ")}{item.description.split(" ").length > 10 && "..."}
                    </p>


                    <p className="card-date">
                      Posted on: {new Date(item.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p> 
                    <div className="d-flex justify-content-between align-items-center">
                      <button className="read-full-button" onClick={() => handleReadMore(item._id)}>Read Full</button>
                      <span><FaHeart style={{fontSize:'20px'}} /> {item.likes}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-results">No results found.</p>
              )}
            </div>
            {/* Pagination */}
            <div className="pagination mt-5 d-flex justify-content-center gap-2">
              {Array.from({ length: Math.ceil(filteredData.length / postsPerPage) }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Explore;