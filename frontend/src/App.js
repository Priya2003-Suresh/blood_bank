import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login/login";
import Home from "./dashboard/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}  


export default App;
