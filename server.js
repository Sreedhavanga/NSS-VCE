const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/userAuth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Schema and Model
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  feedback: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});
const Feedback = mongoose.model("Feedback", feedbackSchema);


// Define schema and model directly in server.js
const volunteerScoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const VolunteerScore = mongoose.model("VolunteerScore", volunteerScoreSchema);


// TFI Data Schema
const tfiDataSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // Ensure unique date
  participants: [
    {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
  ],
});

const TFIData = mongoose.model("TFIData", tfiDataSchema);

// BDC Data Schema
const bdcDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const BDCData = mongoose.model("BDCData", bdcDataSchema);

// Freshers Data Schema
const freshersDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const FreshersData = mongoose.model("FreshersData", freshersDataSchema);

// Nodemailer transporter setup (using Gmail SMTP, change to a more secure solution in production)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vasavivce12@gmail.com", // Replace with your email
    pass: "bzwq dzdf qxgi ulmz",   // Use an app password for Gmail
  },
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare passwords
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, "secret_key", { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during login." });
  }
});

// API endpoint to get leaderboard data
app.get("/leaderboard", async (req, res) => {
  try {
    const scores = await VolunteerScore.find().sort({ score: -1 }).limit(10); // Top 10 volunteers
    res.json(scores);
  } catch (err) {
    console.error("Error fetching leaderboard data:", err);
    res.status(500).send("Internal Server Error");
  }
});

// API endpoint to add a new volunteer score
app.post("/leaderboard", async (req, res) => {
  const { name, score } = req.body;

  if (!name || !score) {
    return res.status(400).send("Name and score are required");
  }

  try {
    const newScore = new VolunteerScore({ name, score });
    await newScore.save();
    res.status(201).json(newScore);
  } catch (err) {
    console.error("Error adding volunteer score:", err);
    res.status(400).send("Bad Request");
  }
});


// TFI Registration Route
app.post("/register", async (req, res) => {
  const { date, participants } = req.body;

  if (!date || !participants || participants.length === 0) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if the date is already registered
    const existingData = await TFIData.findOne({ date });
    if (existingData) {
      return res.status(400).json({ message: "Registration for this date already exists." });
    }

    // Save the registration data
    const newTFIData = new TFIData({ date, participants });
    await newTFIData.save();

    // Send confirmation emails to each participant
    for (const participant of participants) {
      const { name, email } = participant;

      // Email options
      const mailOptions = {
        from: "vasavivce12@gmail.com",   // Your email address
        to: email,                      // Participant's email address
        subject: "TFI Registration Confirmation",
        text: `Dear ${name},\n\nThank you for your registration! You have successfully registered for TFI on ${date}.\n\nBest regards,\nTFI Team`,
      };

      

      // Send email
      try {
        await transporter.sendMail(mailOptions);
      } catch (emailErr) {
        console.error("Error sending email to", email, emailErr);
      }
    }

    // Respond to the frontend
    res.status(201).json({ message: "Registration successful! Confirmation emails sent." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during registration." });
  }
});
// Freshers Data Route
app.post("/freshersData", async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    // Save the Freshers registration data
    const newFreshersData = new FreshersData({ name, phone, email });
    await newFreshersData.save();

    // Send confirmation email to the participant
    const mailOptions = {
      from: "vasavivce12@gmail.com", // Your email address
      to: email,                    // Participant's email address
      subject: "Freshers Registration Confirmation",
      text: `Dear ${name},\n\nThank you for registering for Freshers! We have received your details and look forward to seeing you at the event.\n\nBest regards,\nNSS Team`,
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log("Confirmation email sent to:", email);
    } catch (emailErr) {
      console.error("Error sending email to", email, emailErr);
    }

    // Respond to the frontend
    res.status(201).json({ message: "Freshers Data saved successfully! Confirmation email sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving Freshers Data." });
  }
});

app.post("/feedback", async (req, res) => {
  try {
    const { name, email, feedback } = req.body;
    const newFeedback = new Feedback({ name, email, feedback });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ message: "Failed to submit feedback." });
  }
});


// BDC Data Route
app.post("/bdcData", async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    // Save the BDC registration data
    const newBDCData = new BDCData({ name, phone, email });
    await newBDCData.save();

    // Send confirmation email to the participant
    const mailOptions = {
      from: "vasavivce12@gmail.com", // Your email address
      to: email,                    // Participant's email address
      subject: "Blood Donation Registration Confirmation",
      text: `Dear ${name},\n\nThank you for registering for the Blood Donation event! We appreciate your contribution and support.\n\nBest regards,\nNSS Team`,
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log("Confirmation email sent to:", email);
    } catch (emailErr) {
      console.error("Error sending email to", email, emailErr);
    }

    // Respond to the frontend
    res.status(201).json({ message: "BDC Data saved successfully! Confirmation email sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving BDC Data." });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
