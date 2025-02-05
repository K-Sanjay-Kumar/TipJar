import React, { useState } from "react";
import Header from "../constants/header";
import axios from "axios";

function ContactUs() {
    const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace this URL with your backend API endpoint
      const response = await axios.post("/api/users/contactus", formData);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      alert("Failed to send the message. Please try again.");
    }
  };

  return (
    <>
    <Header />
    <div style={containerStyle}>
      <h1 style={headingStyle}>Contact Us</h1>
      <form style={formStyle} onSubmit={handleSubmit}>
        
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
        
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required style={inputStyle} />
        
        <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required style={inputStyle} />
        
        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required style={textareaStyle} />
        
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      
      </form>
        {success && (<p style={{ color: "#00d09c", marginTop: "10px", fontSize: "16px", fontWeight: "bold" }}> Thank you for contacting us! </p> )}
    </div>
    </>
  );
}

const containerStyle = {
  backgroundColor: "#121212",
  color: "#fff",
  minHeight: "100vh",
  padding: "50px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontFamily: "Arial, sans-serif",
};

const headingStyle = {
  fontSize: "32px",
  color: "#00d09c",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "500px",
  backgroundColor: "#1e1e1e",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
};

const inputStyle = {
  padding: "10px",
  margin: "10px 0",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#333",
  color: "#fff",
  outline: "none",
};

const textareaStyle = {
  padding: "10px",
  margin: "10px 0",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#333",
  color: "#fff",
  minHeight: "120px",
  resize: "none",
  outline: "none",
};

const buttonStyle = {
  backgroundColor: "#00d09c",
  color: "#121212",
  padding: "12px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "10px",
};

export default ContactUs;
