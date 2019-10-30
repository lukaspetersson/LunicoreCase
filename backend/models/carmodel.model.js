const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carmodelSchema = new Schema({
	id: {type: Number, unique: true},
	brand: {type: String, required: true, trim: true},
    model: {type: String, required: true, trim: true},
    price: {type: Number, required: true},
});

const CarModel = mongoose.model('CarModel', carmodelSchema);

module.exports = CarModel;
