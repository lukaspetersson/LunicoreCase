const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {type : String , unique : true, required : true, dropDups: true},
	password: {type: String, required: true, trim: true},
	employee_id: {type: Number},
	total_sales: {type: Number},
	email: {type: String, required: true, trim: true},
	access: {type: Number},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
