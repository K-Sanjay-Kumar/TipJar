import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "./admin-nav";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ManageUsers() {
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  if(token != "adminAuthenticated") navigate("/Knowfinity/admin/login");

  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const usersPerPage = 10;

  useEffect(() => {
    axios
      .get("/api/admin/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const AdminUserDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  return (
    <>
      <AdminNav />
      <div style={containerStyle}>
        <h1 style={titleStyle}>Manage Users</h1>

        <div className="text-center">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            style={searchInputStyle}
          />
        </div>

        <table style={tableStyle}>
          <thead>
            <tr className="text-center">
              <th style={thTdStyle}>Name</th>
              <th style={thTdStyle}>Email</th>
              <th style={thTdStyle}>Phone Number</th>
              <th style={thTdStyle}>Image</th>
              <th style={thTdStyle}>Posts</th>
              <th style={thTdStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td style={thTdStyle}>{user.name}</td>
                <td style={thTdStyle}>{user.email}</td>
                <td style={thTdStyle}>{user.number}</td>
                <td style={thTdStyle}>
                    <button className="btn btn-primary" onClick={() => setSelectedImage(`/images/users/${user.image}`)}>
                        <FaEye /> View
                    </button>
                </td>
                <td style={thTdStyle}>{user.posts}</td>
                <td style={thTdStyle}>
                  <button style={deleteButtonStyle} onClick={() => AdminUserDelete(user._id)}>
                    Delete
                  </button>
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

        {selectedImage && (
          <div style={popupOverlayStyle} onClick={() => setSelectedImage(null)}>
            <div style={popupImageContainerStyle}>
              <img src={selectedImage} alt="Popup" style={popupImageStyle} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const containerStyle = { padding: "20px", backgroundColor: "#121212", minHeight: "100vh" };
const titleStyle = { color: "#00d09c", textAlign: "center" };
const tableStyle = { width: "100%", color: "#fff", marginTop: "20px", borderCollapse: "collapse", border: "1px solid white" };
const imageStyle = { width: "50px", height: "50px", borderRadius: "50%", cursor: "pointer" };
const deleteButtonStyle = { backgroundColor: "#d9534f", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer" };
const paginationStyle = { marginTop: "20px", textAlign: "center" };
const paginationButtonStyle = { backgroundColor: "#5bc0de", color: "#fff", margin: "5px", border: "none", padding: "5px 10px" };
const searchInputStyle = { margin: "20px 0", padding: "8px", width: "50%", border: "1px solid #00d09c" };
const thTdStyle = { border: "1px solid white", padding: "10px" };
const popupOverlayStyle = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.7)", display: "flex", alignItems: "center", justifyContent: "center" };
const popupImageContainerStyle = { maxWidth: "90%", maxHeight: "90%" };
const popupImageStyle = { width: "250px", height: "auto", borderRadius: "10px" };

export default ManageUsers;
