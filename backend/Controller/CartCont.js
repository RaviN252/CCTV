const Cart = require('../Schema/CartSchema');
const Product = require('../Schema/ProductSchema');

// ✅ Add product to cart (Create or Update)
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity < 1) {
            return res.status(400).json({ message: "Invalid request data" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Create new cart if not exists
            cart = new Cart({ userId, products: [] });
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex > -1) {
            // If product exists, update quantity
            cart.products[productIndex].quantity += quantity;
        } else {
            // Add new product
            cart.products.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Get cart by user ID
exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate('products.productId', 'name price images');

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Update product quantity in cart
exports.updateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not in cart" });
        }

        cart.products[productIndex].quantity = quantity;
        await cart.save();

        res.status(200).json({ message: "Cart updated", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Remove product from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.products = cart.products.filter(p => p.productId.toString() !== productId);
        await cart.save();

        res.status(200).json({ message: "Product removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Clear entire cart
exports.clearCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.products = [];
        await cart.save();

        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
