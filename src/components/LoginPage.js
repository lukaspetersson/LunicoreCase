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
		}
		this.login = this.login.bind(this)
		this.signup = this.signup.bind(this)



	}

	getUsers() {

	}

	login(){
		//this.setState({loginVisibility:false})
			console.log("HHHHHHHåpjonå")
	}
	signup(){
		axios.get('http://localhost:5000/users/')
		 .then(res =>{
			 var inputUname = document.getElementById("uname").value;
			 var inputPword = document.getElementById("uname").value;
			 var taken = false

			 for(var i = 0; i < res.data.length; i++){
				 if(res.data[i].username === inputUname){
					 taken = true;
					 console.log("Username already taken")
				 }
			 }
			 if(!taken){
				 const user = {
					 username: inputUname,
					 password: inputPword
				 }
				 axios.post('http://localhost:5000/users/add', user)
		     		 .then(res => console.log("User added", res.data))
		     		 .catch(err => console.log(err));
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
			return (
				<div>
					{background}
					<div className="loginBtn"  onClick={() => this.setState({loginVisibility:true})}>
						<img alt="" src={person_icon} />
						<span>Login</span>
					</div>
					<form style={{opacity: showLogin, visibility: visible, right: this.state.loginSize+"vw", left: this.state.loginSize+"vw", bottom: 20-this.state.loginSize/6+"vh"}}>
						<div className="container" >
							<label htmlFor="uname"><b>Username</b></label>
							<input type="text" placeholder="Enter Username" id="uname" required/>

							<label htmlFor="psw"><b>Password</b></label>
							<input type="password" placeholder="Enter Password" id="psw" required/>
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

	}
}

export default LoginPage;
