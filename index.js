// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a Mongoose schema for the contact data
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  tel: { type: String, required: true },
  query: { type: String, required: true },
});

// Create a model from the schema
const Contact = mongoose.model('Contact', contactSchema);

// POST endpoint to save contact data
app.post('/api/contact', async (req, res) => {
  const { name, email, tel, query } = req.body;

  const newContact = new Contact({ name, email, tel, query });

  try {
    await newContact.save();
    res.status(200).json({ message: 'Contact information saved successfully!' });
  } catch (error) {
    console.error('Error saving contact information:', error);
    res.status(500).json({ message: 'Error saving contact information' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
