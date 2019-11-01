import React from 'react';
import './LoginPage.css';
import person_icon from "./../assets/person_icon.svg"
import axios from 'axios';


class LoginPage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			loginVisibility: false,
			loginSize:null,
			user:null
		}
		this.login = this.login.bind(this)
		this.signup = this.signup.bind(this)
		this.logout = this.logout.bind(this)
	}
	logout(){
		this.props.setUserFromParent(null, null)
		this.setState({loginVisibility:false, user: null})
	}
	login(){
		axios.get('http://localhost:5000/users/')
		 .then(res =>{
			 var inputUname = document.getElementById("uname").value;
			 var inputPword = document.getElementById("pword").value;
			 var exists = false

			 for(var i = 0; i < res.data.length; i++){
				 var user = res.data[i];
				 if(user.username === inputUname){
					 exists = true;
					 if(user.password === inputPword){
						 this.props.setUserFromParent(user)
						 this.setState({loginVisibility:false, user:{username: inputUname, employee_id: user.employee_id, total_sales: user.total_sales}})
					 }else{
						 alert("Wrong password");
					 }
				 }
			 }
			 if(!exists){
				 alert("User does not exist");
			 }
		 })
	}
	signup(){
		axios.get('http://localhost:5000/users/')
		 .then(res =>{
			 var inputUname = document.getElementById("uname").value;
			 var inputPword = document.getElementById("pword").value;
			 var taken = false

			 for(var i = 0; i < res.data.length; i++){
				 if(res.data[i].username === inputUname){
					 taken = true;
					 alert("Username already taken");
				 }
			 }
			 if(!taken){
				 axios.get('http://localhost:5000/total_sales/')
		 		.then(resEmployees =>{
		 			var employee_id = null;
					var totalSales = null;
		 			for(var j=0; j<resEmployees.data.length; j++){
		 				if(resEmployees.data[j].name === inputUname){
		 					employee_id=resEmployees.data[j].id;
							totalSales=resEmployees.data[j].total_sales;
		 					this.setState({employee: true})
		 				}
		 			}
					const user = {
   					 username: inputUname,
   					 password: inputPword,
					 employee_id: employee_id,
					 total_sales: totalSales
	   				 }
	   				 axios.post('http://localhost:5000/users/add', user)
	   		     		 .then(res => {
	   						 console.log("User added", res.data)
	   						 this.props.setUserFromParent(user)
							 this.setState({loginVisibility:false, user:{username: inputUname, employee_id: user.employee_id, total_sales: user.total_sales}})
	   					 })
	   		     		 .catch(err => console.log(err));
		 		 })
			 }
		 })
	}
	componentDidMount(){
		this.resizeWindow()
		window.addEventListener('resize', this.resizeWindow)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resizeWindow)
	}
	resizeWindow = ()=>{
		if(window.innerWidth < 600){
			this.setState({
				loginSize:8,
			})
		}else if(window.innerWidth < 800){
			this.setState({
				loginSize:15,
			})
		}else{
			this.setState({
				loginSize:30,
			})
		}
	}

	render() {
			var showLogin = 0;
			var visible = "hidden";
			if(this.state.loginVisibility){
				showLogin=1
				visible = "visible"
				var background = <div className="outsideSpaceLogin" onClick={() => this.setState({loginVisibility:false})}></div>
			}
			if(!this.state.user){
				return (
					<div>
						{background}
						<div className="loginBtn"  onClick={() => this.setState({loginVisibility:true})}>
							<img alt="" src={person_icon} />
							<span>Logga in</span>
						</div>
						<form style={{opacity: showLogin, visibility: visible, right: this.state.loginSize+"vw", left: this.state.loginSize+"vw", bottom: 20-this.state.loginSize/6+"vh"}}>
							<div className="container" >
								<label htmlFor="uname"><b>Username</b></label>
								<input type="text" placeholder="Enter Username" id="uname" required/>

								<label htmlFor="psw"><b>Password</b></label>
								<input type="password" placeholder="Enter Password" id="pword" required/>
								<button type="button" onClick={()=>{this.login()}}>Login</button>
								<button type="button" style={{background:"gray"}} onClick={() => this.signup()}>Sign up</button>
							</div>

							<div className="container">
								<button type="button" className="cancelbtn" onClick={() => this.setState({loginVisibility:false})}>Cancel</button>
								<span className="psw">Forgot password?</span>
							</div>
						</form>
					</div>
				);

			}else{
				var profileinfo="";
				if(this.state.user.employee_id){
					profileinfo = <div className="profileInfo"><p>Total försäljning: {this.state.user.total_sales}kr</p><p>Anställnings-ID: {this.state.user.employee_id}</p></div>
				}
				return (
					<div>
						{background}
						<div className="loginBtn"  onClick={() => this.setState({loginVisibility:true})}>
							<img alt="" src={person_icon} />
							<span>{this.state.user.username}</span>
						</div>
						<div className="profile" style={{opacity: showLogin, visibility: visible, right: this.state.loginSize+"vw", left: this.state.loginSize+"vw", bottom: 20-this.state.loginSize/6+"vh"}}>
							<div className="logoutBtn"  onClick={() => this.logout()}>
								<img alt="" src={person_icon} />
								<span>Logga ut</span>
							</div>
								{profileinfo}
						</div>
					</div>
				);
			}
	}
}

export default LoginPage;
