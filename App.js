const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Atlas connection string
const mongoURI =
  "mongodb+srv://mubarekadem001:123456abcd@cluster0.tsvjy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define MongoDB Schema and Model
const UserSchema = new mongoose.Schema({
  userId: String,
  name: String,
  username: String,
  score: { type: Number, default: 0 },
});

const User = mongoose.model("User", UserSchema);

// Middleware
app.use(bodyParser.json());

// Serve static files (images, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// API endpoint to get user data
app.get("/api/user/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// API endpoint to save or update user score
app.post("/api/user", async (req, res) => {
  const { userId, name, username, score } = req.body;
  try {
    let user = await User.findOneAndUpdate(
      { userId },
      { name, username, $inc: { score: score } }, // Increment score correctly
      { upsert: true, new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
