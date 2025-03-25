const Product = require("../Schema/ProductSchema"); // Import Product Schema


// Create a single product with image upload OR image URLs
exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, stock, category } = req.body;
        let images = [];

        // ✅ If files were uploaded via form-data
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => file.path);
        }
        // ✅ If image URLs were provided as JSON (either string or array)
        else if (req.body.images) {
            try {
                images = typeof req.body.images === 'string'
                    ? JSON.parse(req.body.images) // if sent as stringified JSON
                    : req.body.images;           // if sent as an array directly
            } catch (err) {
                return res.status(400).json({ message: "Invalid images format. Should be array or JSON string." });
            }
        }

        // ❌ No images found
        if (!images || images.length === 0) {
            return res.status(400).json({ message: "At least one image is required." });
        }

        // Create and save product
        const newProduct = new Product({ name, price, images, description, stock, category });
        await newProduct.save();

        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
};




// Bulk Upload - Multiple Products with Images
// exports.createBulkProducts = async (req, res) => {
//     try {
//         const products = JSON.parse(req.body.products); // Convert JSON string to array

//         if (!Array.isArray(products) || products.length === 0) {
//             return res.status(400).json({ message: "Please provide an array of products." });
//         }

//         // Attach uploaded images to each product
//         products.forEach((product, index) => {
//             if (req.files[index]) {
//                 product.images = req.files[index].map(file => file.path);
//             }
//         });

//         const createdProducts = await Product.insertMany(products);
//         res.status(201).json({ message: "Products added successfully!", data: createdProducts });
//     } catch (error) {
//         res.status(500).json({ message: "Error adding products", error: error.message });
//     }
// };
exports.createBulkProducts = async (req, res) => {
    try {
        const products = Array.isArray(req.body.products)
            ? req.body.products
            : JSON.parse(req.body.products); // Handle stringified JSON

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Please provide an array of products." });
        }

        // Optional: Validate images field
        for (let product of products) {
            if (!product.images || !Array.isArray(product.images)) {
                return res.status(400).json({ message: "Each product must have an array of image URLs." });
            }
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
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};

// Update a product with new images
// exports.updateProduct = async (req, res) => {
//     try {
//         const { name, price, description, stock, category } = req.body;
//         let images = req.body.images || [];

//         // Check if new images are uploaded
//         if (req.files && req.files.length > 0) {
//             images = req.files.map(file => file.path);
//         }

//         const updatedProduct = await Product.findByIdAndUpdate(
//             req.params.id,
//             { name, price, images, description, stock, category },
//             { new: true, runValidators: true }
//         );

//         if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

//         res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating product", error: error.message });
//     }
// };

// Update a product with new and existing images
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, description, stock, category } = req.body;

        // 1. Parse the 'existingImages' JSON string
        let existingImages = [];
        try {
            existingImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];
        } catch (err) {
            return res.status(400).json({ message: "Invalid format for existingImages" });
        }

        // 2. Add new uploaded images
        const newImages = req.files ? req.files.map(file => file.path.replace(/\\/g, "/")) : [];

        // 3. Combine both
        const finalImages = [...existingImages, ...newImages];

        // 4. Update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                price,
                description,
                stock,
                category,
                images: finalImages,
            },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};



// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};
