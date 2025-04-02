import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import timeImage from "../image/1.jpg"
import "./login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailPattern.test(email)) {
      Swal.fire("Invalid Email", "Please enter a valid email format!", "error");
      setIsSubmitting(false);
      return;
    }

    if (!passwordPattern.test(password)) {
      Swal.fire(
        "Weak Password",
        "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.",
        "error"
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password }, { withCredentials: true });

      console.log("Login Response:", response.data); // Debugging
    
            if (response.data.success) {
                const { token, user } = response.data;
    
                // Store auth token and user details
                localStorage.setItem("authToken", token);
                localStorage.setItem("user", JSON.stringify(user));
    
                
    
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Login Successful',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate("/home");
                });
            }
        } catch (error) {
            console.error("Login Error:", error.response?.data);  // Debugging
    
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.response?.data?.message || 'Invalid Email or Password',
                confirmButtonText: 'OK',
            });
        }
    

    setIsSubmitting(false);
  };

  return (
    <div className="login-page">
      <nav className="navbar">
        <div>
          <a href="/home">Home</a>
          <a href="/about">About Us</a>
          <a href="/donors">Donors</a>
          <a href="/search">Search Donor</a>
          <a href="/contact">Contact</a>
        </div>
        <a href="/admin">Admin</a>
      </nav>

      <div className="login-container">
        <button className="close-btn" onClick={() => navigate("/home")}>X</button>
        <h2>Login Now</h2>
        <form onSubmit={validateForm}>
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
        </form>

        <div className="forgot-password">
          <a href="/forgot">Forgot your password?</a>
        </div>
        <div className="create-account">
          <a href="/register">Don't have an account? Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
