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

	}

	componentDidMount() {

	}


	addCar() {
		const sale = {
			id: 1,
			employee_id: 2,
			carmodel_id: 3,
		}

		const car = {
			id: 3,
			brand: "sss",
			model: "ttt",
			price: 1900
		}

		console.log(car);


	   axios.post('http://localhost:5000/carmodels/add', car)
		 .then(res => console.log(res.data))
		 .catch(err => console.log(err));

	}

	getCar() {
	   axios.get('http://localhost:5000/carmodels/')
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
