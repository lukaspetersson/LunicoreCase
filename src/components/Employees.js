import React from 'react';
import './Employees.css';
import person_icon from "./../assets/person_icon.svg"
import arrow_back from "./../assets/arrow_back.svg"
import arrow_forward from "./../assets/arrow_forward.svg"
import SmallBlock from "./SmallBlock.js";
import axios from 'axios';


class Employees extends React.Component {
    constructor(props){
            super(props)
            this.state = {
                employees:[],
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
			this.getEmployees = this.getEmployees.bind(this);
			this.deleteEmployee = this.deleteEmployee.bind(this);

    }

	getEmployees() {
		axios.get('http://localhost:5000/employees/')
		.then((res) =>{
			var employees = [];
			for(var i=0; i <res.data.length;i++){
				var employee ={
					first: res.data[i].name,
					image: person_icon,
					id: res.data[i].id,
					access: res.data[i].access
				}
				employees[i] = employee;
			}
			this.setState({
				employees: employees
			});
		});
	}

	deleteEmployee(id) {
		axios.delete('http://localhost:5000/employees/delete/'+id, id)
 	   .then(res => this.getEmployees())
 	   .catch(err => console.log(err));

	   axios.get('http://localhost:5000/users/')
	   .then((res) =>{
		   for(var i=0; i <res.data.length;i++){
			   if(res.data[i].email === id+"@lunicar.se"){
				   axios.delete('http://localhost:5000/users/delete/'+res.data[i].username, res.data[i].username)
		    	   .then(res => {
					   this.getEmployees()
					   this.props.rerenderSwitch();
				   })
		    	   .catch(err => console.log(err));
			   }
		   }
	   });
	}

    componentDidMount() {
	this.getEmployees()
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
		var renderEmployees = [];
		for(var i=0; i < this.state.employees.length; i++){
			renderEmployees[i] = <div className="employee" key={i}><SmallBlock removeFunction={(id)=>{this.deleteEmployee(id)}} removeOption={(this.props.isAdmin&&this.state.employees[i].access!==1)} info={this.state.employees[i]} height={"220px"}/></div>
		}
        return (
            <div className="employeeBody">
                <h1>Vi hjälper dig!</h1>
                <img alt="" className="arrowsEmployees" id="firstArrow" src={arrow_back} onClick={() => this.scrollSide(-1)} style = {this.state.arrowStyle.left}/>
                <div className="employeeContainer" ref={this.blocksContainerRef} >
                    {renderEmployees}
                </div>
                <img alt="" className="arrowsEmployees" id="secondArrow" src={arrow_forward}onClick={() => this.scrollSide(1)} style = {this.state.arrowStyle.right}/>
            </div>
        );
        }
}

export default Employees;
