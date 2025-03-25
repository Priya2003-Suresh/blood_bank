import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateForm = (event) => {
    event.preventDefault(); // Prevent form submission from refreshing the page
    let isValid = true;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validate email format
    if (!emailPattern.test(email)) {
      setEmailError("Invalid Email Format");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate password format
    if (!passwordPattern.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters, contain uppercase, lowercase, a number, and a special character."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    // If everything is valid, navigate to the home page
    if (isValid) {
      // For demonstration purposes, you can navigate to /home
      navigate("/home");
    }
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
        <button className="close-btn" onClick={() => navigate("/home")}>
          X
        </button>
        <h2>Login Now</h2>
        <form onSubmit={validateForm}>
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="error">{emailError}</div>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <div className="error">{passwordError}</div>}

          <button type="submit">Login</button>
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
