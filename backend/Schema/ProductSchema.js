const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true }, 
    description: { type: String },
    stock: { type: Number, default: 0 },
    category: { type: String }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
