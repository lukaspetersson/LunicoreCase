const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salesSchema = new Schema({
	brand: { type: String, required: true ,trim: true},
    model: { type: String, required: true },
    price: { type: Number, required: true },
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
