import React from 'react';
import './LoginPage.css';
import person_icon from "./../assets/person_icon.svg"


class LoginPage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			loginVisibility: false,
			loginSize:null,
		}
		this.login = this.login.bind(this)

	}

	login(){
		this.setState({loginVisibility:false})
			console.log("HHHHHHHåpjonå")
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
							<input type="text" placeholder="Enter Username" name="uname" required/>

							<label htmlFor="psw"><b>Password</b></label>
							<input type="password" placeholder="Enter Password" name="psw" required/>

							<button type="button" onClick={()=>{this.login()}}>Login</button>
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
