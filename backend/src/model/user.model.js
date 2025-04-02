// user.model.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
   {
       fullName: {
           type: String,
           required: true,
           minlength: 3,
       },
       phoneNumber: {
           type: String,
           required: true,
           match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
       },
       email: {
           type: String,
           required: true,
           unique: true,
           match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"],
       },
       age: {
           type: Number,
           required: true,
           min: 18,
       },
       gender: {
           type: String,
           required: true,
           enum: ["Male", "Female", "Other"],
       },
       bloodGroup: {
           type: String,
           required: true,
       },
       address: {
           type: String,
           required: true,
       },
       password: {
           type: String,
           required: true,
           minlength: 8,
       },
   },
   {
       timestamps: true,
   }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model("User", userSchema);
export default User;
