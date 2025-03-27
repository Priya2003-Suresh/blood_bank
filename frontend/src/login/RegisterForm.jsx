import React, { useState } from "react";
import "./RegisterationForm.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    blood: "",
    address: "",
    message: "",
    password: ""
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = (e) => {
    e.preventDefault();
    const { fullname, phone, email, password, age, gender, blood, address } = formData;

    if (fullname.length < 3) return alert("Full Name must be at least 3 characters.");
    if (!/^[0-9]{10}$/.test(phone)) return alert("Phone number must be exactly 10 digits.");
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return alert("Invalid email address.");
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) return alert("Password must include uppercase, lowercase, number, and special character.");
    if (age < 18) return alert("You must be at least 18 years old.");
    if (!gender || !blood || !address.trim()) return alert("Please fill out all required fields.");

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      window.location.href = "home";
    }, 2000);
  };

  return (
    <div className="register-container">
      
      <div className="form-wrapper">
        <h2>Register Now</h2>
        <form onSubmit={validateForm}>
          <input type="text" id="fullname" placeholder="Full Name" onChange={handleChange} required />
          <input type="text" id="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input type="email" id="email" placeholder="Email ID" onChange={handleChange} required />
          <input type="number" id="age" placeholder="Age" onChange={handleChange} required />
          <select id="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select id="blood" onChange={handleChange} required>
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
          <textarea id="message" placeholder="Any message" onChange={handleChange}></textarea>
          <input type="password" id="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="btn">Register</button>
        </form>
        {success && <div className="success-popup">Registration Successful! Redirecting...</div>}
      </div>
    </div>
  );
};

export default RegisterForm;
