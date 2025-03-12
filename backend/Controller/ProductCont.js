const Product = require("../Schema/ProductSchema"); // Import Product model

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, price, images, description, stock, category } = req.body;

        if (!name || !price || !images || images.length === 0) {
            return res.status(400).json({ message: "Name, price, and at least one image are required." });
        }

        const newProduct = new Product({ name, price, images, description, stock, category });
        await newProduct.save();

        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
};


// script for  Bulk upload products
exports.createBulkProducts = async (req, res) => {
    try {
        const products = req.body; // Expecting an array of products
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Please provide an array of products." });
        }

        const createdProducts = await Product.insertMany(products);
        res.status(201).json({ message: "Products added successfully!", data: createdProducts });
    } catch (error) {
        res.status(500).json({ message: "Error adding products", error: error.message });
    }
};


// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};
