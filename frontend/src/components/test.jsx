import React, { useState, useRef } from "react";
import "../assets/css/explore.css";
import image1 from "../assets/images/nature_1.jpg";
import image2 from "../assets/images/nature_2.jpg";
import image3 from "../assets/images/nature_3.jpg";
import Header from "../constants/header";
import { FaSearch } from "react-icons/fa";

const initialData = [
  { id: 1, title: "Card 1", image: image1, description: "This is a short description for Card 1.", createdDate: "2025-01-01" },
  { id: 2, title: "Card 2", image: image2, description: "This is a short description for Card 2.", createdDate: "2025-01-15" },
  { id: 3, title: "Card 3", image: image3, description: "This is a short description for Card 3.", createdDate: "2025-01-20" },
  { id: 4, title: "Card 4", image: image1, description: "This is a short description for Card 1.", createdDate: "2025-01-01" },
  { id: 5, title: "Card 5", image: image2, description: "This is a short description for Card 2.", createdDate: "2025-01-15" },
];

function Test() {

  const token = localStorage.getItem("token");

  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const filteredData = initialData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <Header />
    <div className="explore-page">
      {!token ? (
        <p className="not-login">Login to your acoount to explore...</p>
      ) : (
        <div className="explore-container">
        {/* Search and Filter Section */}
        <div className="explore-controls">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input className="explore-search form-control" type="text" placeholder="Search for a specific post..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>

        <div className="total-posts text-center mt-2">
          <p>Total Posts: {initialData.length}</p>
        </div>

        {/* Cards Section */}
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
            {initialData.slice(0, 10).map((item) => (
              <div key={item.id} className="recent-card">
                <img src={item.image} alt="" className="card-img" />
                <h2 className="card-title">{item.title}</h2>
                <p className="card-description">{item.description}</p>
                <p className="card-date">Posted on: {item.createdDate}</p>
                <button className="read-full-button">Read Full</button>
              </div>
            ))}
          </div>

        </div>

        <div className="all-posts">
          <h2>All Posts</h2>
          <div className="explore-cards mt-5">
            {filteredData.length ? (
              filteredData.map((item) => (
                <div key={item.id} className="explore-card">
                  <img src={item.image} alt="" className="card-img"/>
                  <h2 className="card-title">{item.title}</h2>
                  <p className="card-description">{item.description}</p>
                  <p className="card-date">Posted on: {item.createdDate}</p>
                  <button className="read-full-button">Read Full</button>
                </div>
              ))
            ) : (
              <p className="no-results">No results found.</p>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
    </>
  );
}

export default Test;

