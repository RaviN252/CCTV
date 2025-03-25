const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    name: { type: String, required: true },
   
    images: { type: [String], required: true }, 
    description: { type: String },
   
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Banner', BannerSchema);
