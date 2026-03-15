import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";
import userModel from "./db.js";
import bcrypt from "bcrypt";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
        return res.status(400).json({
            message: "User already exists",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModel.create({
        username,
        password: hashedPassword
    });
    res.status(201).json({
        message: "Signup successful",
        user: result
    });
});
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
        return res.status(404).json({
            message: "user not exist"
        });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid password",
        });

    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({
        message: "login completed",
        token,
        user
    });

});

app.listen(PORT || 3000 , ()=>{
    console.log("port is running on the 3000");
})
