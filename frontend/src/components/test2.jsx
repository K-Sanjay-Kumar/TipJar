import React, { useEffect, useState } from "react";
import Header from "../constants/header";
import { Button, Card, Container, Modal, Form, ListGroup } from "react-bootstrap";
import axios from "axios";
import { FaRegClock } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

function Profile() {
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [formData, setFormData] = useState({
    token: token,
    author: user.name,
    title: "",
    description: "",
    status: "pending",
    image: "",
  });
  const [updateData, setUpdateData] = useState({
    name: user.name || "",
    email: user.email || "",
    number: user.number || "",
  });
  const [posts, setPosts] = useState([]);

  const handleClose = () => setShowModal(false);
  const handleUpdateClose = () => setShowUpdate(false);
  const handleShow = () => setShowModal(true);
  const handleUpdate = () => setShowUpdate(true);

  // Handle change in post form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Creating the post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token, author, title, description, status, image } = formData;

    const sendData = new FormData();
    sendData.append('token', token);
    sendData.append('author', author);
    sendData.append('title', title);
    sendData.append('description', description);
    sendData.append('status', status);
    sendData.append('image', image); // Make sure you append the actual image file

    // Debugging: Log the FormData contents
    sendData.forEach((value, key) => {
      console.log(key, value);
    });
    

    try {
      const response = await axios.post(`/api/posts`, {
        token,
        author,
        title,
        description,
        status,
        image,
      });

      if (response.data.success) {
        alert("Post created successfully");

        // Update user state and local storage
        const updatedUser = { ...user, posts: user.posts ? user.posts + 1 : 1 };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Fetch updated posts list
        fetchPosts();
        handleClose();
      }
    } catch (error) {
      console.error(error);
      alert("Error creating post");
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0].name });
  };
  
  
  const handleUpdateChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  // Handle updating user details
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const number = updateData.number.trim() === "" ? "123456789" : updateData.number;

    try {
      const response = await axios.put(`/api/users/${token}`, {
        name: updateData.name,
        number,
      });

      if (response.data.success) {
        const updatedUser = { ...user, ...response.data.user };

        // Update state and localStorage with updated user data
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        handleUpdateClose();
      }
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/posts/${token}`);
      if (response.data.success) {
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(`/api/posts/${postId}`);
      if (response.data.success) {
        alert("Post deleted successfully");
        fetchPosts(); // Refresh post list
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting post");
    }
  };
  

  return (
    <>
      <Header />
      <Container className="mt-5 start" style={{ color: "white"}}>
        {/* User Info Card */}
        <Card className="bg-dark p-4 shadow-lg mb-4">
          <div className="row align-items-center text-center text-md-start">
            <div className="col-md-4 mb-3 mb-md-0">
              <img
                src={`/src/assets/images/users/${user.image}`}
                alt="Profile"
                className="img-fluid rounded-circle"
                style={{ maxWidth: "150px", height: "auto", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-8">
              <h1 className="mb-2 text-warning">{user.name}</h1>
              <p className="mb-1 text-white">
                <span style={{ color: "#a5a5a5" }}>Email:</span> {user.email}
              </p>
              <p className="mb-1 text-white">
                <span style={{ color: "#a5a5a5" }}>Number: </span> 
                {user.number === "123456789" ? "-" : user.number}
              </p>
              <p className="text-white">
                <span style={{ color: "#a5a5a5" }}>Total Posts:</span> {posts.length}
              </p>
            </div>
          </div>

          <div className="d-flex justify-content-center justify-content-md-between mt-4">
            <Button variant="outline-light" size="sm" onClick={handleUpdate}>
              Update Profile
            </Button>
          </div>
        </Card>


        {/* Posts Section */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-3 text-warning">Your Posts</h4>
          <Button variant="outline-warning" size="sm" onClick={handleShow}>
            Create Post +
          </Button>
        </div>

        {/* Render Post List */}
        <ListGroup>
          {posts.map((post) => (
            <ListGroup.Item
              key={post.id}
              className="bg-secondary text-white mb-2 d-flex justify-content-between align-items-center"
              style={{ borderRadius: "8px" }}
            >
              <div>
                <strong style={{fontSize:'25px'}}>{post.title}</strong>
                {/* <p className="mb-0 text-muted">Posted at: {post.createdAt}</p> */}
                <p className="mb-0 text-muted" style={{fontSize:'12px'}}>
                  Posted: {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              {post.status === "pending" ? (
                <div className="d-flex align-items-center gap-3">
                  <div className="text-warning" id="posts-status" style={{backgroundColor:'black', padding:'8px 13px', borderRadius:'15px'}}>Pending <FaRegClock /></div>
                  <div className="text-danger" id="posts-status" style={{backgroundColor:'black', padding:'8px 13px', borderRadius:'15px', cursor: "pointer"}} onClick={() => handleDeletePost(post._id)}>Delete <MdDeleteOutline /></div>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center">
                    <p className="me-3">Views: {post.views}</p>
                    <p>Likes: {post.likes}</p>
                  </div>
                  <div className="text-danger" id="posts-status" style={{backgroundColor:'black', padding:'8px 13px', borderRadius:'15px', cursor: "pointer"}} onClick={() => handleDeletePost(post._id)}>Delete <MdDeleteOutline /></div>
                </div>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* posts instructions */}
        <div className="posts-instructions">
          <h4 className="mt-5 mb-3 text-warning">Important points before creating the post.</h4>
          <ul style={{color:'rgb(165, 165, 165)'}}>
            <li>
              The content that you post will be visible to everyone.
            </li>
            <li>
              The content should be appropriate and not contain any offensive material.
            </li>
            <li>
              The posts will be checked by the admin before being published.
            </li>
            <li>
              The posts will be accepted or rejected based on the content within 24 hours.
            </li>
            <li>
              You can delete your posts at any time.
            </li>
          </ul>
        </div>

        {/* Create Post Modal */}
        <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "black", fontWeight: "600", fontSize: "18px" }}>Create New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "black", fontWeight: "600", fontSize: "18px" }}>Title</Form.Label>
                  <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "black", fontWeight: "600", fontSize: "18px" }}>Description</Form.Label>
                  <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} rows={3} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "black", fontWeight: "600", fontSize: "18px" }}>Image</Form.Label>
                  <Form.Control type="file" name="image" onChange={handleImageChange} />
                </Form.Group>

                <Button type="submit" variant="primary">Create Post</Button>
              </Form>
            </Modal.Body>
          </Modal>

        {/* Update Details Modal */}
        <Modal show={showUpdate} onHide={handleUpdateClose} centered>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label style={{ color: "black", fontWeight: "600", fontSize: "18px" }}>
                  Name
                </Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter your name" value={updateData.name} onChange={handleUpdateChange} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNumber">
                <Form.Label style={{ color: "black", fontWeight: "600", fontSize: "18px" }}>
                  Number
                </Form.Label>
                <Form.Control type="text" name="number" placeholder="Enter your number" value={updateData.number} onChange={handleUpdateChange} required />
              </Form.Group>
              <div className="text-end">
                <Button variant="secondary" onClick={handleUpdateClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="warning" className="ms-2">
                  Update
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default Profile;
