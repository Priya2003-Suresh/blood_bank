import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./RegisterationForm.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    age: "",
    gender: "",
    bloodGroup: "",
    address: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = (e) => {
    e.preventDefault();
    const { fullName, phoneNumber, email, password, age, gender, bloodGroup, address } = formData;

    if (fullName.length < 3) return Swal.fire("Error", "Full Name must be at least 3 characters.", "error");
    if (!/^[0-9]{10}$/.test(phoneNumber)) return Swal.fire("Error", "Phone number must be exactly 10 digits.", "error");
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return Swal.fire("Error", "Invalid email address.", "error");
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) return Swal.fire("Error", "Password must include uppercase, lowercase, number, and special character.", "error");
    if (age < 18) return Swal.fire("Error", "You must be at least 18 years old.", "error");
    if (!gender || !bloodGroup || !address.trim()) return Swal.fire("Error", "Please fill out all required fields.", "error");

    handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      Swal.fire("Success", "Registration Successful! Redirecting to Login...", "success").then(() => {
        navigate("/");
      });
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="register-container">
      <div className="form-wrapper">
        <h2>Register Now</h2>
        <form onSubmit={validateForm}>
          <input type="text" id="fullName" placeholder="Full Name" onChange={handleChange} required />
          <input type="text" id="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
          <input type="email" id="email" placeholder="Email ID" onChange={handleChange} required />
          <input type="number" id="age" placeholder="Age" onChange={handleChange} required />
          <select id="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select id="bloodGroup" onChange={handleChange} required>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <input type="text" id="address" placeholder="Address" onChange={handleChange} required />
          <input type="password" id="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
