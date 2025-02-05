import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaGoogle } from "react-icons/fa6";
import '../assets/css/login.css';
import Header from "../constants/header";

function Login() {
    const navigate = useNavigate();
    const [formType,setFormType] = useState("login");

    // const login = useGoogleLogin({
    //     onSuccess: (tokenResponse) => {
    //         getUserProfile(tokenResponse);
    //     },
    //     onError: (error) => console.log(error),
    // });

    // const getUserProfile = (tokenResponse) => {
    //     axios
    //         .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse?.access_token}`, {
    //             headers: {
    //                 Authorization: `Bearer ${tokenResponse?.access_token}`,
    //                 Accept: "Application/json",
    //             },
    //         })
    //         .then((response) => {
    //             localStorage.setItem("user", JSON.stringify(response.data));
    //             navigate("/explore");
    //         });
    // };

    const handleLogin = async (e) => {
        document.querySelector(".form-head-messages").textContent = "";

        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
    
        try {
            const response = await axios.post("/api/users/login", { email, password });
    
            if (response.data.success) {
                localStorage.setItem("token", response.data.token); // Store token if required
                // updateUser(response.data.token);
                const messageElement = document.querySelector(".messages");
                messageElement.textContent = "Successfully logged in";
                messageElement.style.color = "green";
                navigate("/explore");
            } else {
                const messageElement = document.querySelector(".messages");
                messageElement.textContent = "Invalid email or password";
                messageElement.style.color = "red";
            }
        } catch (error) {
            const messageElement = document.querySelector(".messages");
                messageElement.textContent = "Invalid email or password";
                messageElement.style.color = "red";
        }
    };   

    // State for Sign Up form inputs
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        number: "123456789", // Default number
        image: "user.jpg",    // Default image path
        posts: 0           // Default posts count
    });
    
    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword, number, image, posts } = formData;

        if (password !== confirmPassword) {
            const messageElement = document.querySelector(".messages");
                messageElement.textContent = "Passwords do not match!";
                messageElement.style.color = "red";
            return;
        }

        try {
            const response = await axios.post("/api/users", {
                name,
                email,
                password,
                number,
                image,
                posts
            });

            if (response.data.success) {
                const messageElement = document.querySelector(".form-head-messages");
                messageElement.textContent = "Signup successful!";
                messageElement.style.color = "green";
                setFormType("login");
            }
        } catch (error) {
            const messageElement = document.querySelector(".messages");
                messageElement.textContent = error.response?.data?.message || error.message;
                messageElement.style.color = "red";
        }
    };

    return (
        <>
        <Header />
        <div className="container d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
            <div className="login-container">
            <p className="form-head-messages text-center"></p>
                {formType==="login" ? (
                    <form className="login-form" onSubmit={handleLogin}>
                        <h2 className="form-title">Login</h2>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="login-input" placeholder="Enter your email" required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="login-input" placeholder="Enter your password" required />
                        </div>
                        <button type="submit" className="login-button">Login</button>
                        <p className="messages text-center"></p>

                        {/* <div className="divider">OR</div>

                        <button type="button" className="google-login-button" onClick={login}>
                            <FaGoogle /> Continue with Google
                        </button> */}

                        <p className="signup-text">
                            Don't have an account? &nbsp; 
                            <span className="signup-link" onClick={() => setFormType("signup")}>
                                Sign Up
                            </span>
                        </p>
                    </form>
                    ) : (
                    <form className="login-form" onSubmit={handleSignUp}>
                        <h2 className="form-title">SignUp</h2>
                        <input type="hidden" name="number" value={formData.number}  />
                        <input type="hidden" name="image" value={formData.image}  />
                        <input type="hidden" name="posts" value={formData.posts} />
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="login-input" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="login-input" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="login-input" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="login-input" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="login-button">SignUp</button>
                        <p className="messages text-center"></p>
    
                        {/* <div className="divider">OR</div>
    
                        <button type="button" className="google-login-button" onClick={login}>
                            <FaGoogle /> Continue with Google
                        </button> */}
    
                        <p className="signup-text">
                            Already have an account? &nbsp;
                            <span className="signup-link" onClick={() => setFormType("login")}>
                                Login
                            </span>
                        </p>
                    </form>
                )}
            </div>
        </div>
        </>
    );
}

export default Login;