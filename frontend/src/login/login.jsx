import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
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
      const response = await axios.post(
        "http://localhost:5000/api/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        Swal.fire("Login Successful", "Welcome back!", "success").then(() => {
          navigate("/home");
        });
      } else {
        Swal.fire("Login Failed", response.data.message || "Invalid credentials!", "error");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Something went wrong. Please try again!",
        "error"
      );
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
