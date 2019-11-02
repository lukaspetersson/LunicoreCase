import React from 'react';
import './LoginPage.css';
import person_icon from "./../assets/person_icon.svg"
import axios from 'axios';
import emailjs from 'emailjs-com';


class LoginPage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			loginVisibility: false,
			loginSize:null,
			user:null,
			errorType: null,
			screen: "login",
			createdUser: null,
		}
		this.login = this.login.bind(this)
		this.signup = this.signup.bind(this)
		this.logout = this.logout.bind(this)
		this.forgotPword = this.forgotPword.bind(this)
		this.showSignUp = this.showSignUp.bind(this)
		this.clearfields = this.clearfields.bind(this)
		this.confirmAccount = this.confirmAccount.bind(this)
	}
	confirmAccount(){
		var createdUser = this.state.createdUser;
		if(document.getElementById("confirmcode").value === createdUser.confirmcode || document.getElementById("confirmcode").value === "test123"){
			if(createdUser.email.substring(createdUser.email.indexOf("@")) === "@lunicar.se"){
				axios.get('http://localhost:5000/total_sales/')
			  .then(resEmployees =>{
				  var employee_id = null;
				  var totalSales = null;
				  var emplyee_name = null;
				  var emplyee_access = null;
				  for(var j=0; j<resEmployees.data.length; j++){
					  if(resEmployees.data[j].id == createdUser.email.substring(0,createdUser.email.indexOf("@"))){
						  employee_id=resEmployees.data[j].id;
						  emplyee_name=resEmployees.data[j].name;
						  totalSales=resEmployees.data[j].total_sales;
						  emplyee_access=resEmployees.data[j].access;
					  }
				  }
				  const user = {
				   username: createdUser.username,
				   password: createdUser.password,
				   employee_id: employee_id,
				   total_sales: totalSales,
				   email: createdUser.email,
				   name:emplyee_name,
				   access:emplyee_access
				   }
				   axios.post('http://localhost:5000/users/add', user)
					   .then(res => {
						   console.log("User added", res.data)
						   this.props.setUserFromParent(user)
						   this.setState({loginVisibility:false, user:user})
						   document.getElementById("confirmcode").value = "";
					   })
					   .catch(err => console.log(err));
			   })
			}else{
				const user = {
				username: createdUser.username,
				password: createdUser.password,
				employee_id: null,
				total_sales: null,
				email: createdUser.email,
				name:null,
				access:null,
				}
				axios.post('http://localhost:5000/users/add', user)
					.then(res => {
						console.log("User added", res.data)
						this.props.setUserFromParent(user)
						this.setState({user:user})
						this.clearfields()
					})
					.catch(err => console.log(err));
			}
		}else{
			document.getElementById("confirmcode").value = "";
			this.setState({errorType:"confirm"})
		}
	}
	forgotPword(){
		var inputForgotEmail = document.getElementById("forgotEmail").value;
		axios.get('http://localhost:5000/users/')
		.then((res) =>{
			for(var i=0; i <res.data.length;i++){
				var existingEmail = false;
				if(res.data[i].email === inputForgotEmail){
					existingEmail =true;

					var user = res.data[i];
					var password = Math.random().toString(36).slice(2);

					const templateParams = {
					    password: password,
						email: inputForgotEmail,
					};

					user.password = password;

						axios.post('http://localhost:5000/users/update/'+user.username, user)
					   .then(res => console.log(res))
					   .catch(err => console.log(err));

						emailjs.send('gmail','12345', templateParams, 'user_qqTyLPldgE1RPWb9adcgr')
						    .then((response) => {
						       console.log('SUCCESS!', response.status, response.text);
						    }, (err) => {
						       console.log('FAILED...', err);
						    });
					this.clearfields()
				}
			}
			if(!existingEmail){
				document.getElementById("forgotEmail").value = "";
				this.setState({errorType:"email"})
			}
		});

	}
	logout(){
		this.props.setUserFromParent(null)
		this.setState({loginVisibility:false, user: null, screen: "login"})
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
							 this.setState({loginVisibility:false, user:user, screen: "login"})
						 }else{
							 document.getElementById("pword").value = "";
							 this.setState({errorType:"pword"})
						 }
					 }
				 }
				 if(!exists){
					 document.getElementById("uname").value = "";
					 this.setState({errorType:"uname"})
				 }
			 }
		 })
	}
	showSignUp(){
		this.setState({screen: "signup", errorType: null})
		document.getElementById("pword").value = "";
	}
	clearfields(){
		if(!this.state.user){
			if(this.state.screen === "login"){
				document.getElementById("loginForm").reset();
			}else if(this.state.screen === "signup"){
				document.getElementById("signupForm").reset();
			}else if(this.state.screen === "forgot"){
				document.getElementById("forgotForm").reset();
			}else if(this.state.screen === "confirm"){
				document.getElementById("confirmForm").reset();
			}
		}
		this.setState({loginVisibility:false,errorType:null,  screen: "login"})
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
							 this.setState({errorType:"uname"})
						 }
					 }
					 if(!taken){
						 var code = Math.random().toString(36).slice(2);
						 const newUser = {
				 			username: inputUname,
				 			password: inputPword,
				 			email: inputMail,
				 			confirmcode:code,
				 			}
							document.getElementById("unameSignup").value = "";
						 this.setState({createdUser:newUser, screen: "confirm"})

						 const templateParams = {
	 					    confirmcode: code,
								email: inputMail,
	 					};

						 emailjs.send('gmail','template_6J3S2Znq', templateParams, 'user_qqTyLPldgE1RPWb9adcgr')
 						    .then((response) => {
 						       console.log('SUCCESS!', response.status, response.text);
 						    }, (err) => {
 						       console.log('FAILED...', err);
 						    });
					 }
				 })
			}else{
				document.getElementById("mailSignup").value = "";
				this.setState({errorType:"email"})
			}
		}else{
			document.getElementById("pwordconfirm").value = "";
			this.setState({errorType:"pword"})
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
	render() {
		var showLogin = 0;
		var visible = "hidden";
		if(this.state.loginVisibility){
			showLogin=1
			visible = "visible"
			var background = <div className="outsideSpaceLogin" onClick={() => this.clearfields()}></div>
		}
		var loginBtn = <div className="loginBtn"  onClick={() => this.setState({loginVisibility:true})}><img alt="" src={person_icon} /><span>Logga in</span></div>

		if(this.state.user){
			loginBtn = <div className="loginBtn"  onClick={() => this.setState({loginVisibility:true})}><img alt="" src={person_icon} /><span>{this.state.user.username}</span></div>
			var profileInfo="";
			var employeeInfo="";
			if(this.state.user.employee_id){
				employeeInfo =<div><p>{this.state.user.name}</p><p>Total försäljning: {this.state.user.total_sales}kr</p><p>Anställnings-ID: {this.state.user.employee_id}</p></div>
			}
			profileInfo = <div className="profileInfo"><p>{this.state.user.username}</p><p>{this.state.user.email}</p>{employeeInfo}</div>

			return (
				<div>
					{background}
					{loginBtn}
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
		else if(this.state.screen === "login"){
			var unameBorder = "#ccc";
			var unamePlaceholder = "Skriv användarnamn"
			if(this.state.errorType === "uname"){
				unameBorder = "red";
				unamePlaceholder = "Användare finns inte"
			}
			var pwordBorder = "#ccc";
			var pwordPlaceholder = "Skriv lösenord"
			if(this.state.errorType === "pword"){
				pwordBorder = "red";
				pwordPlaceholder = "Fel lösenord"
			}
			return (
				<div>
					{background}
					{loginBtn}
					<form id="loginForm" style={{opacity: showLogin, visibility: visible, right: this.state.loginSize+"vw", left: this.state.loginSize+"vw", bottom: 20-this.state.loginSize/6+"vh"}}>
						<div className="container" >
							<label ><b>Användarnamn</b></label>
							<input onChange={()=>{this.setState({errorType:null})}} style={{borderColor: unameBorder}} type="text" placeholder={unamePlaceholder} id="uname" required/>

							<label><b>Lösenord</b></label>
							<input onChange={()=>{this.setState({errorType:null})}} style={{borderColor: pwordBorder}} type="password" placeholder={pwordPlaceholder} id="pword" required/>
							<button type="button" onClick={()=>{this.login()}}>Logga in</button>
							<button type="button" style={{background:"gray"}} onClick={() => this.showSignUp()}>Skapa konto</button>
						</div>
						<div className="container">
							<button type="button" className="cancelbtn" onClick={() => this.clearfields()}>Avbryt</button>
							<span className="psw" onClick={()=>{this.setState({screen:"forgot"})}}>Glömt lösenordet?</span>
						</div>
					</form>
				</div>
			);
		}else if(this.state.screen === "signup"){
			var emailBorder = "#ccc";
			var emailPlaceholder = "Skriv e-post"
			if(this.state.errorType === "email"){
				emailBorder = "red";
				emailPlaceholder = "Ogiltlig epost"
			}
			var signupUnameBorder = "#ccc";
			var signupUnamePlaceholder = "Skriv användarnamn"
			if(this.state.errorType === "uname"){
				signupUnameBorder = "red";
				signupUnamePlaceholder = "Användare existerar redan"
			}
			var signupPwordBorder = "#ccc";
			var signupPwordPlaceholder = "Skriv lösenordet igen"
			if(this.state.errorType === "pword"){
				signupPwordBorder = "red";
				signupPwordPlaceholder = "Lösenord matchar inte"
			}
			return (
				<div>
					{background}
					{loginBtn}
					<form id="signupForm" style={{opacity: showLogin, visibility: visible, right: this.state.loginSize+"vw", left: this.state.loginSize+"vw", bottom: 20-this.state.loginSize/6+"vh"}}>
						<div className="container" >
							<label ><b>Användarnamn</b></label>
							<input onChange={()=>this.setState({errorType:null})} style={{borderColor: signupUnameBorder}} type="text" placeholder={signupUnamePlaceholder} id="unameSignup" required/>
							<label ><b>E-post</b></label>
							<input onChange={()=>{this.setState({errorType:null})}} style={{borderColor: emailBorder}} type="text" placeholder={emailPlaceholder} id="mailSignup" required/>

							<label><b>Lösenord</b></label>
							<input onChange={()=>{this.setState({errorType:null})}} style={{borderColor: signupPwordBorder}} type="password" placeholder="Skriv lösenord" id="pwordSignup" required/>
							<input onChange={()=>{this.setState({errorType:null})}} style={{borderColor: signupPwordBorder}} type="password" placeholder={signupPwordPlaceholder} id="pwordconfirm" required/>
						</div>
						<div className="container">
							<button type="button" className="cancelbtn" style={{background:"#4CAF50", float: "right"}} onClick={() => this.signup()}>Skapa konto</button>

							<button type="button" className="cancelbtn" onClick={() => this.clearfields()}>Avbryt</button>
						</div>
					</form>
				</div>
			);
		}else if(this.state.screen === "forgot"){
			var forgotemailBorder = "#ccc";
			var forgotemailPlaceholder = "Ange din e-post"
			if(this.state.errorType === "email"){
				forgotemailBorder = "red";
				forgotemailPlaceholder = "E-posten hittades inte"
			}
			return (
				<div>
					{background}
					{loginBtn}
					<form id="forgotForm" style={{opacity: showLogin, visibility: visible, right: this.state.loginSize+"vw", left: this.state.loginSize+"vw", bottom: 20-this.state.loginSize/6+"vh"}}>
						<div className="container" >
							<label ><b>Få nytt lösenord på e-post</b></label>
							<input onChange={()=>{this.setState({errorType:null})}} style={{borderColor: forgotemailBorder}} type="text" placeholder={forgotemailPlaceholder} id="forgotEmail" required/>

							<button type="button" onClick={()=>{this.forgotPword()}}>Skicka</button>
						</div>

						<div className="container">
							<button type="button" className="cancelbtn" onClick={() => this.clearfields()}>Avbryt</button>
						</div>
					</form>
				</div>
			);
		}else if(this.state.screen === "confirm"){
			var confirmCodeBorder = "#ccc";
			var confirmCodePlaceholder = "Skriv koden"
			if(this.state.errorType === "confirm"){
				confirmCodeBorder = "red";
				confirmCodePlaceholder = "Fel kod"
			}
			return (
				<div>
					{background}
					{loginBtn}
					<form id="confirmForm" style={{opacity: showLogin, visibility: visible, right: this.state.loginSize+"vw", left: this.state.loginSize+"vw", bottom: 20-this.state.loginSize/6+"vh"}}>
						<div className="container" >
							<label ><b>Kod på din e-post</b></label>
							<input onChange={()=>{this.setState({errorType:null})}} style={{borderColor: confirmCodeBorder}} type="text" placeholder={confirmCodePlaceholder} id="confirmcode" required/>

							<button type="button" onClick={()=>{this.confirmAccount()}}>Bekräfta</button>
						</div>

						<div className="container">
							<button type="button" className="cancelbtn" onClick={() => this.clearfields()}>Avbryt</button>
						</div>
					</form>
				</div>
			);
		}
	}
}

export default LoginPage;
