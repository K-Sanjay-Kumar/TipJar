import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "./admin-nav";
import { useNavigate } from "react-router-dom";

function ManageContactUs() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token !== "adminAuthenticated") navigate("/Knowfinity/admin/login");

  const [contactData, setContactData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const postsPerPage = 10;

  useEffect(() => {
    axios
      .get("/api/admin/contactUs")
      .then((response) => setContactData(response.data))
      .catch((error) => console.error("Error fetching contactData:", error));
  }, []);

  const filteredPosts = contactData.filter((post) => {
    const matchesQuery =
      post.email?.toString().includes(searchQuery) 
    const createdAt = new Date(post.createdAt);

    const matchesDate =
      (!startDate || createdAt >= new Date(startDate)) &&
      (!endDate || createdAt <= new Date(endDate));
      return matchesQuery && matchesDate;
    });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentData = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <>
      <AdminNav />
      <div style={containerStyle}>
        <h1 style={titleStyle}>Manage contactUs Data</h1>

        <div className="text-center">
          <input type="text" placeholder="Search by token or ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={searchInputStyle} />

          <div className="d-flex align-items-center justify-content-center" style={{ margin: "20px 0" }}>
            <label style={{ color: "#fff", marginRight: "10px" }}>
              Start Date:
            </label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={dateInputStyle} />
            
            <label style={{ color: "#fff", margin: "0 10px" }}>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={dateInputStyle} />
          </div>
        </div>

        <table style={tableStyle}>
          <thead>
            <tr className="text-center">
              <th style={thTdStyle}>Name</th>
              <th style={thTdStyle}>Email</th>
              <th style={thTdStyle}>Subject</th>
              <th style={thTdStyle}>Message</th>
              <th style={thTdStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((data) => (
              <tr key={data._id}>
                <td style={thTdStyle}>{data.name}</td>
                <td style={thTdStyle}>{data.email}</td>
                <td style={thTdStyle}>{data.subject}</td>
                <td style={thTdStyle}>{data.message}</td>
                <td style={thTdStyle}>
                  {new Date(data.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
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

const containerStyle = {
  padding: "20px",
  backgroundColor: "#121212",
  minHeight: "100vh",
};
const titleStyle = { color: "#00d09c", textAlign: "center" };
const tableStyle = {
  width: "100%",
  color: "#fff",
  marginTop: "20px",
  borderCollapse: "collapse",
  border: "1px solid white",
};
const dateInputStyle = { padding: "8px", marginRight: "10px" };
const paginationStyle = { marginTop: "20px", textAlign: "center" };
const paginationButtonStyle = {
  backgroundColor: "#5bc0de",
  color: "#fff",
  margin: "5px",
  border: "none",
  padding: "5px 10px",
};
const searchInputStyle = {
  margin: "20px 0",
  padding: "8px",
  width: "50%",
  border: "1px solid #00d09c",
};
const thTdStyle = { border: "1px solid white", padding: "10px" };

export default ManageContactUs;
