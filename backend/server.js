const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: './config/config.env' });  

const app = express();
const port = 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Ensure 'uploads' directory exists
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
  console.log("📂 'uploads' folder created.");
}

// Middleware 
app.use(express.json());
app.use(cors());

// MongoDB Atlas connection string (Use environment variables for security)
const dbURI = process.env.MONGO_URI;

if (!dbURI) {
  console.error("❌ MongoDB URI is missing. Check your config.env file.");
  process.exit(1);
}

// Connect to MongoDB Atlas
mongoose.connect(dbURI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});

// Route imports
const userRoutes = require("./routes/userRoutes");
const authRoutes = require('./routes/authRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const productRoutes = require('./routes/productRoutes');

// API Routes
app.use("/api/users", userRoutes);
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', bannerRoutes);

// ✅ Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(port, () => {
  console.log(`🚀 Backend server running at http://localhost:${port}`);
});
