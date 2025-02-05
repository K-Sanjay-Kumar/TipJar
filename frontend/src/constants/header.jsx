import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import ListGroup from "react-bootstrap/ListGroup";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { googleLogout } from "@react-oauth/google";
import logo2 from "../assets/tipjar-logo-removebg-preview.png";
import logo3 from "../assets/tipjar-logo-2.png";

function Header() {
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch user data if token exists
    if (token) {
      fetchUserData(token);
    }

    // Handle screen size changes for logo switching
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, [token]);

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`/api/users/${id}`);
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const popoverContent = (
    <Popover
      id="popover-dark"
      style={{ backgroundColor: "#333", color: "#fff", border: "none" }}
    >
      <Popover.Body
        className="p-2 rounded-3"
        style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)" }}
      >
        <ListGroup variant="flush">
          <ListGroup.Item
            action
            style={{ backgroundColor: "#333", color: "#fff", cursor: "pointer" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#444")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#333")}
            onClick={() => (window.location.href = "/profile")}
          >
            <FaUserCircle style={{ fontSize: "20px" }} /> View Profile
          </ListGroup.Item>
          <ListGroup.Item
            action
            style={{ backgroundColor: "#333", color: "#fff", cursor: "pointer" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#444")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#333")}
            onClick={() => {
              googleLogout();
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            <IoLogOut style={{ fontSize: "20px" }} /> Logout
          </ListGroup.Item>
        </ListGroup>
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar className="bg-dark" variant="dark" sticky="top">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="/">
          <img
            src={isMobile ? logo3 : logo2}
            alt="logo"
            style={{ width: isMobile ? "40px" : "100px" }}
          />
        </Navbar.Brand>
        <Nav className="d-flex align-items-center">
          <Nav.Link href="/explore" className="text-light">
            Explore
          </Nav.Link>
        </Nav>
        <div>
          {user ? (
            <div>
              <Button variant="outline-light" className="me-3"onClick={() => (window.location.href = "/profile")} >
                Create Post +
              </Button>
              <OverlayTrigger trigger="click" placement="bottom" overlay={popoverContent}>
                <Button variant="outline-light">
                  <img src={`/images/users/${user.image}`} alt={user.image} style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }} />
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    &nbsp; {user.name}
                  </span>
                </Button>
              </OverlayTrigger>
            </div>
          ) : (
            <Button variant="outline-light" onClick={() => (window.location.href = "/login")}>Login</Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
