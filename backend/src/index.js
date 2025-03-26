const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow frontend requests
app.use(bodyParser.json()); // Parse JSON body

// Dummy Users Database (Replace with real DB in production)
const users = [
  { email: "priya@gmail.com", password: "Password@123" }, // Example user
];

// Login API Endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Check if email and password match
  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid email or password" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
