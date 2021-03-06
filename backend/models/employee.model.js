const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
	id: {type: Number, unique: true},
	name: {type: String, required: true, trim: true},
	access: {type: Number},
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
