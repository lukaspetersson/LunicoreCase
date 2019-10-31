import React from 'react';
import './CarModels.css';
import car_icon from "./../assets/car_icon.svg"
import arrow_back from "./../assets/arrow_back.svg"
import arrow_forward from "./../assets/arrow_forward.svg"
import SmallBlock from "./SmallBlock.js";
import axios from 'axios';

class CarModels extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			carmodels:[],
			arrowStyle:{
				left:{
					display: "block"
				},
				right:{
					display: "block"
				}
			}
		}
		this.blocksContainerRef = React.createRef();

		this.resize = this.resize.bind(this);
		this.scrollSide = this.scrollSide.bind(this);
		this.getCars = this.getCars.bind(this);
		this.deleteCar = this.deleteCar.bind(this);
	}

	getCars() {
		axios.get('http://localhost:5000/carmodels/')
		.then((res) =>{
			var cars = [];
			for(var i=0; i <res.data.length;i++){
				var car ={
					first: res.data[i].brand,
					second: res.data[i].price,
					image: car_icon,
					id: res.data[i].id,
				}
				cars[i] = car;
			}
			this.setState({
				carmodels: cars
			});
		});
	}

	deleteCar(id) {
		axios.delete('http://localhost:5000/carmodels/delete/'+id, id)
 	   .then(res => console.log(res.data))
 	   .catch(err => console.log(err));
	}

	componentDidMount() {
		this.getCars()
		this.resize.call();
		window.addEventListener('resize', this.resize)

		const blocksContainer = this.blocksContainerRef.current;
		blocksContainer.addEventListener('scroll', this.resize)
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.resize)

		const blocksContainer = this.blocksContainerRef.current;
		blocksContainer.removeEventListener('scroll', this.resize)
	}
	resize = function(){
		const blocksContainer = this.blocksContainerRef.current;
		this.setState({
			arrowStyle:{
				left:{
					display: blocksContainer.scrollLeft < 10 ? "none": "block"
				},
				right:{
					display: (blocksContainer.scrollLeft + blocksContainer.offsetWidth) > (blocksContainer.scrollWidth -10) ? "none": "block"
				}
			}
		});
	}
	scrollSide(direction){
		const container = this.blocksContainerRef.current;
		try{
			container.scrollBy(direction*230, 0)
		}catch{
			container.scrollLeft +=  direction*230
		}
	}
	render() {
		var renderCars = [];
		for(var i=0; i < this.state.carmodels.length; i++){
			var car = this.state.carmodels[i];
			renderCars[i] = <div className="car" key={i}><SmallBlock removeFunction={(id)=>{this.deleteCar(id)}} removeOption={this.props.isEmployee} info={car} height={"280px"}/></div>
		}
		return (
			<div className="carBody">
			<h1>CARMODELS</h1>
			<img alt="" className="arrowsCar" id="firstArrow" src={arrow_back} onClick={() => this.scrollSide(-1)} style = {this.state.arrowStyle.left}/>
			<div className="carContainer" ref={this.blocksContainerRef} >
			{renderCars}
			</div>
				<img alt="" className="arrowsCar" id="secondArrow" src={arrow_forward}onClick={() => this.scrollSide(1)} style = {this.state.arrowStyle.right}/>
			</div>
		);
	}
}

export default CarModels;
