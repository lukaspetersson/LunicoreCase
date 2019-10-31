import React from 'react';
import './App.css';
import axios from 'axios';


class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {

		}
		this.addCar = this.addCar.bind(this);
		this.getCar = this.getCar.bind(this);
		this.deleteCar = this.deleteCar.bind(this);

		this.addEmployee = this.addEmployee.bind(this);
		this.addSale = this.addSale.bind(this);

	}

	componentDidMount() {

		let json = require('./../assets/data.json');
		axios.get('http://localhost:5000/employees/')
		.then(res => {
			if(res.data.length < 1){
				for (var i = 0; i < json.carshop.carmodels.length; i++) {
					this.addCar(json.carshop.carmodels[i])
				}
				for (var j = 0; j < json.carshop.employees.length; j++) {
					this.addEmployee(json.carshop.employees[j])
				}
				for (var k = 0; k < json.carshop.sales.length; k++) {
					this.addSale(json.carshop.sales[k])
				}
			}else{
				console.log("Data not empty")
			}
		});



	}

	addSale(sale) {
	   axios.post('http://localhost:5000/sales/add', sale)
		 .then(res => console.log("Sale added", res.data))
		 .catch(err => console.log(err));
	}

	addEmployee(employee) {
	   axios.post('http://localhost:5000/employees/add', employee)
		 .then(res => console.log("Employee added", res.data))
		 .catch(err => console.log(err));
	}

	addCar(car) {
	   axios.post('http://localhost:5000/carmodels/add', car)
		 .then(res => console.log("Carmodel added",res.data))
		 .catch(err => console.log(err));
	}

	getCar() {
	   axios.get('http://localhost:5000/total_sales/')
		 .then(res => console.log(res.data));
	}

	deleteCar() {
		axios.delete('http://localhost:5000/carmodels/delete/'+3, 3)
 	   .then(res => console.log(res.data))
 	   .catch(err => console.log(err));
	}


	render() {
		var test = this;
		return (
			<div className="App">
				<p onClick={()=>{test.addCar()}}>send</p>

				<p onClick={()=>{test.getCar()}}>get</p>

				<p onClick={()=>{test.deleteCar()}}>delete</p>

			</div>
		);
	}
}

export default App;
