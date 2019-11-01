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
			user:null,
			pwordError: false,
			unameError: false,
			signUp:false,
			emailError: false
		}
		this.login = this.login.bind(this)
		this.signup = this.signup.bind(this)
		this.logout = this.logout.bind(this)
		this.resetColor = this.resetColor.bind(this)
		this.showSignUp = this.showSignUp.bind(this)
		this.clearfields = this.clearfields.bind(this)
	}
	logout(){
		this.props.setUserFromParent(null)
		this.setState({loginVisibility:false, user: null, signUp: false})
	}
	login(){
		axios.get('http://localhost:5000/users/')
		 .then(res =>{
			 var inputUname = document.getElementById("uname").value;
			 var inputPword = document.getElementById("pword").value;
			 if(inputUname && inputPword){
				 var exists = false

				 for(var i = 0; i < res.data.length; i++){
					 var user = res.data[i];
					 if(user.username === inputUname){
						 exists = true;
						 if(user.password === inputPword){
							 this.props.setUserFromParent(user)
							 this.setState({loginVisibility:false, user:user, signUp: false})
						 }else{
							 document.getElementById("pword").value = "";
							 this.setState({pwordError:true})
						 }
					 }
				 }
				 if(!exists){
					 document.getElementById("uname").value = "";
					 this.setState({unameError:true})
				 }
			 }
		 })
	}
	showSignUp(){
		this.setState({signUp: true, unameError:false, pwordError:false, emailError: false})
		document.getElementById("pword").value = "";
	}
	clearfields(){
		if(!this.state.user){
			if(this.state.signUp){
				document.getElementById("unameSignup").value = "";
				document.getElementById("pwordSignup").value = "";
				document.getElementById("mailSignup").value = "";
				document.getElementById("pwordconfirm").value = "";
			}else{
				document.getElementById("pword").value = "";
				document.getElementById("uname").value = "";
			}
		}
		this.setState({loginVisibility:false, unameError:false, pwordError:false, signUp: false})
	}
	signup(){
		if(document.getElementById("pwordSignup").value === document.getElementById("pwordconfirm").value){
			if(document.getElementById("mailSignup").value.includes("@")){
				axios.get('http://localhost:5000/users/')
				 .then(res =>{
					 var inputUname = document.getElementById("unameSignup").value;
					 var inputPword = document.getElementById("pwordSignup").value;
					 var inputMail = document.getElementById("mailSignup").value;
					 var taken = false

					 for(var i = 0; i < res.data.length; i++){
						 if(res.data[i].username === inputUname){
							 taken = true;
							 document.getElementById("unameSignup").value = "";
							 this.setState({unameError:true})
						 }
					 }
					 if(!taken){
						 if(inputMail.substring(inputMail.indexOf("@")) === "@lunicar.se"){
							 axios.get('http://localhost:5000/total_sales/')
	 					   .then(resEmployees =>{
	 						   var employee_id = null;
	 						   var totalSales = null;
							   var emplyee_name = null;
							   var emplyee_access = null;
	 						   for(var j=0; j<resEmployees.data.length; j++){
	 							   if(resEmployees.data[j].id == inputMail.substring(0,inputMail.indexOf("@"))){
	 								   employee_id=resEmployees.data[j].id;
									   emplyee_name=resEmployees.data[j].name;
	 								   totalSales=resEmployees.data[j].total_sales;
									   emplyee_access=resEmployees.data[j].access;
	 							   }
	 						   }
	 						   const user = {
	 							username: inputUname,
	 							password: inputPword,
	 							employee_id: employee_id,
	 							total_sales: totalSales,
	 							email: inputMail,
								name:emplyee_name,
								access:emplyee_access
	 							}
	 							axios.post('http://localhost:5000/users/add', user)
	 								.then(res => {
	 									console.log("User added", res.data)
	 									this.props.setUserFromParent(user)
	 									this.setState({loginVisibility:false, user:user})
	 									this.clearfields()
	 								})
	 								.catch(err => console.log(err));
	 						})
						 }else{
							 const user = {
 		   					 username: inputUname,
 		   					 password: inputPword,
 							 employee_id: null,
 							 total_sales: null,
 							 email: inputMail,
 			   				 }
 			   				 axios.post('http://localhost:5000/users/add', user)
 			   		     		 .then(res => {
 			   						 console.log("User added", res.data)
 			   						 this.props.setUserFromParent(user)
 									 this.setState({loginVisibility:false, user:user})
 									 this.clearfields()
 			   					 })
 			   		     		 .catch(err => console.log(err));
						 }
					 }
				 })
			}else{
				document.getElementById("mailSignup").value = "";
				this.setState({emailError:true})
			}
		}else{
			document.getElementById("pwordconfirm").value = "";
			this.setState({pwordError:true})
		}
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

	resetColor(){
		this.setState({unameError:false, pwordError:false, emailError: false})
	}

	render() {
			var showLogin = 0;
			var visible = "hidden";
			if(this.state.loginVisibility){
				showLogin=1
				visible = "visible"
				var background = <div className="outsideSpaceLogin" onClick={() => this.clearfields()}></div>
			}
			if(!this.state.user){
				if(!this.state.signUp){
					var unameBorder = "#ccc";
					var unamePlaceholder = "Skriv användarnamn"
					if(this.state.unameError){
						unameBorder = "red";
						unamePlaceholder = "Användare finns inte"
					}
					var pwordBorder = "#ccc";
					var pwordPlaceholder = "Skriv lösenord"
					if(this.state.pwordError){
						pwordBorder = "red";
						pwordPlaceholder = "Fel lösenord"
					}
					return (
						<div>
							{background}
							<div className="loginBtn"  onClick={() => this.setState({loginVisibility:true})}>
								<img alt="" src={person_icon} />
								<span>Logga in</span>
							</div>
							<form style={{opacity: showLogin, visibility: visible, right: this.state.loginSize+"vw", left: this.state.loginSize+"vw", bottom: 20-this.state.loginSize/6+"vh"}}>
								<div className="container" >
									<label ><b>Användarnamn</b></label>
									<input onChange={()=>{this.resetColor()}} style={{borderColor: unameBorder}} type="text" placeholder={unamePlaceholder} id="uname" required/>

									<label><b>Lösenord</b></label>
									<input onChange={()=>{this.resetColor()}} style={{borderColor: pwordBorder}} type="password" placeholder={pwordPlaceholder} id="pword" required/>
									<button type="button" onClick={()=>{this.login()}}>Login</button>
									<button type="button" style={{background:"gray"}} onClick={() => this.showSignUp()}>Sign up</button>
								</div>

								<div className="container">
									<button type="button" className="cancelbtn" onClick={() => this.setState({loginVisibility:false, unameError:false, pwordError:false})}>Cancel</button>
									<span className="psw">Forgot password?</span>
								</div>
							</form>
						</div>
					);
				}else{
					var emailBorder = "#ccc";
					var emailPlaceholder = "Skriv e-post"
					if(this.state.emailError){
						emailBorder = "red";
						emailPlaceholder = "Ogiltlig epost"
					}
					var signupUnameBorder = "#ccc";
					var signupUnamePlaceholder = "Skriv användarnamn"
					if(this.state.unameError){
						signupUnameBorder = "red";
						signupUnamePlaceholder = "Användare existerar redan"
					}
					var signupPwordBorder = "#ccc";
					var signupPwordPlaceholder = "Skriv lösenordet igen"
					if(this.state.pwordError){
						signupPwordBorder = "red";
						signupPwordPlaceholder = "Lösenord matchar inte"
					}
					return (
						<div>
							{background}
							<div className="loginBtn"  onClick={() => this.setState({loginVisibility:true})}>
								<img alt="" src={person_icon} />
								<span>Logga in</span>
							</div>
							<form style={{opacity: showLogin, visibility: visible, right: this.state.loginSize+"vw", left: this.state.loginSize+"vw", bottom: 20-this.state.loginSize/6+"vh"}}>
								<div className="container" >
									<label ><b>Användarnamn</b></label>
									<input onChange={()=>{this.resetColor()}} style={{borderColor: signupUnameBorder}} type="text" placeholder={signupUnamePlaceholder} id="unameSignup" required/>
									<label ><b>E-post</b></label>
									<input onChange={()=>{this.resetColor()}} style={{borderColor: emailBorder}} type="text" placeholder={emailPlaceholder} id="mailSignup" required/>

									<label><b>Lösenord</b></label>
									<input onChange={()=>{this.resetColor()}} style={{borderColor: signupPwordBorder}} type="password" placeholder="Skriv lösenord" id="pwordSignup" required/>
									<input onChange={()=>{this.resetColor()}} style={{borderColor: signupPwordBorder}} type="password" placeholder={signupPwordPlaceholder} id="pwordconfirm" required/>
								</div>

								<div className="container">
									<button type="button" className="cancelbtn" style={{background:"#4CAF50", float: "right"}} onClick={() => this.signup()}>Sign up</button>

									<button type="button" className="cancelbtn" onClick={() => this.clearfields()}>Cancel</button>
								</div>
							</form>
						</div>
					);
				}
			}else{
				var profileInfo="";
				var employeeInfo="";
				if(this.state.user.employee_id){
					employeeInfo =<div><p>{this.state.user.name}</p><p>Total försäljning: {this.state.user.total_sales}kr</p><p>Anställnings-ID: {this.state.user.employee_id}</p></div>
				}
				profileInfo = <div className="profileInfo"><p>{this.state.user.username}</p><p>{this.state.user.email}</p>{employeeInfo}</div>

				return (
					<div>
						{background}
						<div className="loginBtn"  onClick={() => this.setState({loginVisibility:true})}>
							<img alt="" src={person_icon} />
							<span>{this.state.user.username}</span>
						</div>
						<div className="profile" style={{opacity: showLogin, visibility: visible, right: this.state.loginSize+"vw", left: this.state.loginSize+"vw", bottom: 20-this.state.loginSize/6+"vh"}}>
							<button type="button" className="logoutBtn"  onClick={() => this.logout()}>
								<img alt="" src={person_icon} />
								<span>Logga ut</span>
							</button>
								{profileInfo}
						</div>
					</div>
				);
			}
	}
}

export default LoginPage;
