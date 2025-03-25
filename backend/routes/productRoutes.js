const express = require('express');
const router = express.Router();
const ProductController = require('../Controllers/ProductCont');
const multer = require('multer');
const path = require('path');

// Configure Multer Storage for Image Uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Images stored in "uploads/" folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
    }
});

// File Filter: Accept Only Images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Multer Setup
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/products', upload.array('images', 5), ProductController.createProduct); // Upload single product with up to 5 images
router.post('/products/bulk', upload.array('images', 50), ProductController.createBulkProducts); // Bulk upload
router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);
router.put('/products/:id', upload.array('images', 5), ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;
