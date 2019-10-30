const router = require('express').Router();
let Sale = require('../models/sale.model');

router.route('/').get((req, res) => {
	Sale.find()
	.then(sale => res.json(sale))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const id = req.body.id;
	const employee_id = req.body.employee_id;
	const carmodel_id = req.body.carmodel_id;

	const newSale = new Sale({
      id,
      employee_id,
	  carmodel_id
    });

	newSale.save()
	.then(() => res.json('Sale added!'))
	.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
