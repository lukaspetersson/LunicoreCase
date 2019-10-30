const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salesSchema = new Schema({
	id: {type: Number, unique: true},
	employee_id: {type: Number, unique: true},
    carmodel_id: {type: Number, unique: true},
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
