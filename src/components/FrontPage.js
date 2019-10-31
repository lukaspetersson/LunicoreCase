import React from 'react';
import './FrontPage.css';
import CoverPage from './CoverPage.js'
import ChatBar from './ChatBar.js'
import ContactSection from './ContactSection.js'
import CarModels from './CarModels.js'
import Employees from './Employees.js'
import LoginPage from './LoginPage.js'
import axios from 'axios';



class FrontPage extends React.Component {
    constructor(props){
            super(props)
            this.state = {
                NavigationBarBackground:{
                    backgroundColor :"transparent",
                },
                menuColor:"#ffffff",
                coverHeight: 500,
				user:{
					username:null,
					employee:null
				}
            }
            this.refCarModels = React.createRef()
            this.refContact = React.createRef()

            this.setCoverHeight = this.setCoverHeight.bind(this);
			this.setUser = this.setUser.bind(this);
			this.addCar = this.addCar.bind(this);
			this.addEmployee = this.addEmployee.bind(this);
			this.addSale = this.addSale.bind(this);
        }

		componentDidMount(){
                window.addEventListener('scroll', this.scrollWindow)

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

	   setUser(user, employee){
		   console.log("RRRRRRRR", user, employee)
		   this.setState({
			   user:{
				   username:user,
				   employee:employee
				   }
			   })
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

       componentWillUnmount() {
         window.removeEventListener('scroll', this.scrollWindow)
       }

		scrollWindow = () =>{
            this.setState({
              menuColor: window.pageYOffset > this.state.coverHeight? "#94C3F1" : "#ffffff",
            })
        }
        setCoverHeight(height){
          this.setState({coverHeight: height})
        }

    render() {
        return (
                <div className="body">
                        <div className="navigationMenu">
                            <ChatBar menuColor={this.state.menuColor}/>
                        </div>
						<div className="loginMenu">
                             <LoginPage setUserFromParent={(user, employee)=>{this.setUser(user, employee)}}/>
                        </div>
                        <div className="WelcomeSection">
                            <CoverPage scrollfromParent={()=>{window.scrollTo(0, this.refCarModels.current.offsetTop)}} setCoverHeight={this.setCoverHeight}/>
                        </div>

                        <div className="contentsSections" ref={this.refCarModels}>
                            <CarModels isEmployee={this.state.user.employee}/>
                        </div>

						<div className="contentsSections">
                            <Employees/>
                        </div>

                        <div className="contentsSections" ref={this.refContact}>
                            <ContactSection/>
                        </div>
                </div>
        );
    }
}

export default FrontPage;
