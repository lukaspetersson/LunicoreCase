const router = require('express').Router();
let Employee = require('../models/employee.model');

router.route('/').get((req, res) => {
	Employee.find()
	.then(employees => res.json(employees))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const id = req.body.id;
	const name = req.body.name;

	const newEmployee = new Employee({
      id,
      name
    });

	newEmployee.save()
	.then(employee => res.json(employee))
	.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
