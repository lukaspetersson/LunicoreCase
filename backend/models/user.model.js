const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {type : String , unique : true, required : true, dropDups: true},
	password: {type: String, required: true, trim: true},
	employee_id: {type: Number},
	total_sales: {type: Number},
	email: {type: String, required: true, trim: true},
	name: {type : String},
	access: {type: Number},
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password, null);
};


const User = mongoose.model('User', userSchema);

module.exports = User;
