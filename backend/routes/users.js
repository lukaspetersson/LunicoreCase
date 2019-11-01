const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
	User.find()
	.then(users => res.json(users))
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

	newUser.save()
	.then(employee => res.json(employee))
	.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
