const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './config/config.env' });  
const app = express();
const port = 5000;
const JWT_SECRET = process.env.JWT_SECRET;
// all controller files imported

const authMiddleware = require('./Middleware/authMiddleware');
const AuthController = require("./Controller/authController");
const ProductController = require("./Controller/ProductCont");
const CartController = require("./Controller/CartCont");


console.log("JWT_SECRET:", JWT_SECRET);




// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Atlas connection string (Use environment variables for security)
const dbURI = process.env.MONGO_URI;

if (!dbURI) {
  console.error("❌ MongoDB URI is missing. Check your config.env file.");
  process.exit(1); // Exit process if no MongoDB URI
}

// Connect to MongoDB Atlas
mongoose.connect(dbURI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err));

// all Routes 
app.get('/', (req, res) => {
  res.send('Hello from the backend server!');
});



// Authentication Routes
app.post('/register', AuthController.register);
app.post('/login', AuthController.login);
app.get('/profile', authMiddleware.authMiddleware, AuthController.getProfile);
// crud for product 
app.post('/products', ProductController.createProduct);  // for single produxts 
app.post('/products/bulk', ProductController.createBulkProducts);// all api working fine  
app.get('/products', ProductController.getAllProducts);  // working fine with the api 
app.get('/products/:id', ProductController.getProductById);  // working 
app.put('/products/:id', ProductController.updateProduct);  // working 
app.delete('/products/:id', ProductController.deleteProduct);// working fine

// crud for cart 
app.post('/cart/add', CartController.addToCart);  // working fine
app.get('/cart/:userId', CartController.getCart);  // working fine 
app.put('/cart/update', CartController.updateCart);  // working 
app.delete('/cart/remove', CartController.removeFromCart); // first user needs to login 
app.delete('/cart/clear/:userId', CartController.clearCart); // first user needs to login 


// order 


// Start the server
app.listen(port, () => {
  console.log(`🚀 Backend server running at http://localhost:${port}`);
});
