const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
	brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
