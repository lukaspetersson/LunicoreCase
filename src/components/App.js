import React from 'react';
import './App.css';
import axios from 'axios';


class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {

		}
		this.postUser = this.postUser.bind(this);
		this.getUser = this.getUser.bind(this);
	}

	componentDidMount() {

	}


	postUser() {
		const sale = {
			id: 1,
			employee_id: 2,
			carmodel_id: 3,
		}

		const car = {
			id: 2,
			brand: "sss",
			model: "ttt",
			price: 1900
		}

		console.log(car);

	   axios.delete('http://localhost:5000/carmodels/delete/'+2, 2)
		 .then(res => console.log(res.data))
		 .catch(err => console.log(err));

	}

	getUser() {
	   axios.get('http://localhost:5000/sales/')
		 .then(res => console.log(res.data));
	}


	render() {
		var test = this;
		return (
			<div className="App">
				<p onClick={()=>{test.postUser()}}>send</p>

				<p onClick={()=>{test.getUser()}}>get</p>

			</div>
		);
	}
}

export default App;
