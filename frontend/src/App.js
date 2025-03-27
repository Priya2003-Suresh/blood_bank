import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login/login";
import Home from "./dashboard/Home";
import RegisterForm from "./login/RegisterForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  );
}  


export default App;
