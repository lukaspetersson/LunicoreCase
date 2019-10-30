const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salesSchema = new Schema({
	id: {type: Number, unique: true},
	employee_id: {type: Number, unique: true},
    carmodel_id: {type: Number, unique: true},
});

const Sale = mongoose.model('Sale', salesSchema);

module.exports = Sale;
