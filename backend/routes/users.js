const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
	User.find()
	.then(users => res.json(users))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/signin/:username').get((req, res) => {
	User.findOne({username: req.params.username})
	.then(user => {
	    if (user.validPassword(req.params.password)) {
	        res.json(user)
		}else{
			res.status(401).json('Error: Wrong password', user)
		}
	})
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const employee_id = req.body.employee_id;
	const total_sales = req.body.total_sales;
	const email = req.body.email;
	const name = req.body.name;
	const access = req.body.access;

	const newUser= new User({
		username,
		password,
		employee_id,
		total_sales,
		email,
		name,
		access
	});

	newUser.password = newUser.generateHash(password)

	newUser.save()
	.then(employee => res.json(employee))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:username').delete((req, res) => {
	const id = req.params.username;
	User.findOneAndRemove({ username: id }).exec()
	.then(employee => res.json(employee))
	.catch(err => res.status(400).json('Error: ' + err));

});

router.route('/update/:username').post((req, res) => {
	User.findOne({username: req.params.username})
	.then(user => {
		user.username = req.body.username;
		user.password = user.generateHash(req.body.password);
		user.employee_id = req.body.employee_id;
		user.total_sales = req.body.total_sales;
		user.email = req.body.email;
		user.name = req.body.name;
		user.access = req.body.access;

		user.save()
		.then(user => res.json(user))
		.catch(err => res.status(400).json('Error: ' + err));
	})
	.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
