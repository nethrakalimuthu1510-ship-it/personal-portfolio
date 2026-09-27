require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("X MONGO_URI is missing from .env");
    process.exit(1);
}

const client = new MongoClient(mongoURI, {
    tls: true
});

let messagesCollection;

// Home route
app.get("/", (req, res) => {
    res.send("Portfolio Backend is Running!");
});

// Contact form route
app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await messagesCollection.insertOne({
            name: name,
            email: email,
            message: message,
            createdAt: new Date()
        });

        console.log("New Contact Message:");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Message:", message);

        res.json({
            success: true,
            message: "Message saved successfully!"
        });

    } catch (error) {
        console.error("Failed to save message:", error);

        res.status(500).json({
            success: false,
            message: "Failed to save message."
        });
    }
});

// Connect MongoDB and start server
async function startServer() {
    try {
        await client.connect();

        console.log("MongoDB connected successfully!");

        const database = client.db("portfolioDB");
        messagesCollection = database.collection("messages");

        app.listen(5000, () => {
            console.log("Server running on http://localhost:5000");
        });

    } catch (error) {
        console.error("X MongoDB connection error:");
        console.error(error);
    }
}

startServer();