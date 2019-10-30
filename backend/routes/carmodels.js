const router = require('express').Router();
let CarModel = require('../models/carmodel.model');

router.route('/').get((req, res) => {
	CarModel.find()
	.then(carmodel => res.json(carmodel))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const id = req.body.id;
	const brand = req.body.brand;
	const model = req.body.model;
	const price = req.body.price;

	const newCarModel = new CarModel({
		id,
		brand,
		model,
		price
	});

	newCarModel.save()
	.then(car => res.json(car))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
	const id = req.params.id;
	CarModel.findOneAndRemove({ id: id }).exec()
	.then(car => res.json(car))
	.catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;
