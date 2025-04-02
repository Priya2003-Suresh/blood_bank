// import the required packages
import express from "express"
import dotenv from "dotenv"
import cors from "cors"

// Database connection
import { connectDb } from "./src/lib/db.js"

// Import the routes
import authRoutes from './src/routes/auth.route.js'

//  setting up for the backend
const app = express()
dotenv.config()
app.use(express.json()) // this will allow us to extract the json data from the request body

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from React frontend
    methods: 'GET,POST,PUT,DELETE',   // Allowed methods
    allowedHeaders: 'Content-Type,Authorization', // Allowed headers
    credentials:true,
}));

// access the port number from the .env file
const PORT = process.env.PORT;

// set up the routes
app.use("/api/auth",authRoutes);

// port information
app.listen(PORT,()=>{
    connectDb();
    console.log(`Server is running on port ${PORT}`);
})