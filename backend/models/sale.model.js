const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salesSchema = new Schema({
	id: {type: Number, unique: true},
	employee_id: {type: Number},
    carmodel_id: {type: Number},
});

const Sale = mongoose.model('Sale', salesSchema);

module.exports = Sale;
