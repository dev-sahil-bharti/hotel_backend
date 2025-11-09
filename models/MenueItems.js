 const mongoose = require('mongoose')

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    type: {
        type: String,
        enum: ['Veg', 'Non-Veg'],
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
});

const MenueItems = mongoose.model('Dish', dishSchema);

module.exports = MenueItems;