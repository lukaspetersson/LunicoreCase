const router = require('express').Router();
let Sale = require('../models/sale.model');
let Employee = require('../models/employee.model');
let CarModel = require('../models/carmodel.model');


router.route('/').get((req, res) => {
	Promise.all([
        Employee.find().exec(),
        CarModel.find().exec(),
		Sale.find().exec()
	]).then(result => {
		var employees = result[0];
		var carmodels = result[1];
		var sales = result[2];

		var totalSalesList = [];
		for(var i = 0; i < employees.length; i++){
						var totalSales = 0;
						for(var j = 0; j < sales.length; j++){
							if(employees[i].id === sales[j].employee_id){
								for(var k = 0; k < carmodels.length; k++){
									if(carmodels[k].id === sales[j].carmodel_id){
										var price = carmodels[k].price
										totalSales+=price
									}
								}
							}
					}
					totalSalesList[i] = {
						id: employees[i].id,
						name: employees[i].name,
						total_sales: totalSales
					}
				}
        res.json(totalSalesList)
	}).catch(err => res.status(400).json('Error: ', err));
});

module.exports = router;
