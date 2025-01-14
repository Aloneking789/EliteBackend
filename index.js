// Import necessary packages
const express = require('express');
const cors = require('cors'); // Import cors
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();

// Middleware for parsing JSON requests
app.use(cors());
app.use(express.json());

// Connect to your MongoDB database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define your contact schema and model
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// POST endpoint to save contact data
app.post('/api/contact', async (req, res) => {
    console.log("Request received");
    const { name, email, phone, message } = req.body;

    try {
        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();
        res.status(201).json({ message: 'Contact saved successfully' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ error: 'An error occurred while saving the contact' });
    }
});

// Export the app for Vercel
module.exports = app;
