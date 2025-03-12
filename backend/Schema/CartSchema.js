const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ],
    totalPrice: { type: Number, default: 0 }, // Stores the total price
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Middleware to update totalPrice before saving
cartSchema.pre('save', async function (next) {
    const cart = this;
    let total = 0;

    for (const item of cart.products) {
        const product = await mongoose.model('Product').findById(item.productId);
        if (product) {
            total += product.price * item.quantity;
        }
    }

    cart.totalPrice = total;
    cart.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Cart', cartSchema);
