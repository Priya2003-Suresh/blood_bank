
// auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const signup = async (req, res) => {
    const { fullName, phoneNumber, email, age, gender, bloodGroup, address, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = new User({
            fullName,
            phoneNumber,
            email,
            age,
            gender,
            bloodGroup,
            address,
            password, // Password will be hashed via pre-save middleware
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("authToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict", maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.status(201).json({
            success: true,
            message: "Registration successful",
            user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            },
            token,
        });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("authToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict", maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("authToken");
    res.status(200).json({ success: true, message: "Logout successful" });
};
