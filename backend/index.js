require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const paymentRoutes = require('./stripe');

const app = express();

// MongoDB connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
};

connect();

// Middleware
app.use(express.json());

app.use(cors({
    origin: "*",
}));

// Routes
app.get('/', (req, res) => {
    res.json({ data: "Hello" });
});

//STRIPE routes
app.use(cors());
app.use(express.json()); // Parse JSON requests

app.use('/api/payments', paymentRoutes);














// Start the server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
