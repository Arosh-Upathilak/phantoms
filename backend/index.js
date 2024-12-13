require("dotenv").config();
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

connect();
const User = require("./models/user");

const express = require('express');
const cors = require('cors');
const app = express();
const { authenticatedRoute, authenticateToken } = require("./utilities");

app.use(express.json());

app.use(cors({
    origin: "*"
}));

app.get('/', (req, res) => {
    res.json({ data: "Hello" });
});

// Backend Ready!!

// Create account
app.post("/createAccount", async (req, res) => {
    const { fullName, userName, uniReg, university, email, password } = req.body;

    if (!fullName) {
        return res.status(400).json({ error: "Full name is required" });
    }
    if (!userName) {
        return res.status(400).json({ error: "Username is required" });
    }
    if (!uniReg) {
        return res.status(400).json({ error: "University registration number is required" });
    }
    if (!university) {
        return res.status(400).json({ error: "University is required" });
    }
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }

    const isUser = await User.findOne({ email });
    if (isUser) {
        return res.json({
            error: true,
            message: "User already exists"
        });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ fullName, userName, uniReg, university, email, password: hashedPassword });
    await user.save();

    // Generate JWT token with just the user id
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m"
    });

    return res.json({
        error: false,
        user: { fullName, userName, email, uniReg, university },
        message: "User created successfully",
        accessToken
    });
});

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    const userInfo = await User.findOne({ email });
    if (!userInfo) {
        return res.status(400).json({
            error: true,
            message: "User does not exist"
        });
    }



    
    // Compare hashed password with bcrypt
    const isPasswordCorrect = await bcrypt.compare(password, userInfo.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({
            error: true,
            message: "Invalid credentials"
        });
    }

    // Generate JWT token with just the user id
    const accessToken = jwt.sign({ userId: userInfo._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3600000m"
    });

    return res.json({
        error: false,
        message: "User logged in successfully",
        accessToken
    });
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

module.exports = app;
