import React from 'react';
import './UserDisplay.css';
import person_icon from "./../assets/person_icon.svg"
import arrow_back from "./../assets/arrow_back.svg"
import arrow_forward from "./../assets/arrow_forward.svg"
import SmallBlock from "./SmallBlock.js";
import axios from 'axios';


class UserDisplay extends React.Component {
    constructor(props){
            super(props)
            this.state = {
                users:[],
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
			this.getUsers = this.getUsers.bind(this);
			this.deleteUser = this.deleteUser.bind(this);

    }

	getUsers() {
		axios.get('http://localhost:5000/users/')
		.then((res) =>{
			var users = [];
			for(var i=0; i <res.data.length;i++){
				var user ={
					first: res.data[i].username,
					second: res.data[i].email,
					image: person_icon,
					id: res.data[i].username,
					access: res.data[i].access
				}
				users[i] = user;
			}
			this.setState({
				users: users
			});
		});
	}

	deleteUser(id) {
		axios.delete('http://localhost:5000/users/delete/'+id, id)
 	   .then(res => this.getUsers())
 	   .catch(err => console.log(err));
	}

    componentDidMount() {
	this.getUsers()
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
		var renderUsers = [];
		for(var i=0; i < this.state.users.length; i++){
			renderUsers[i] = <div className="users" key={i}><SmallBlock removeFunction={(id)=>{this.deleteUser(id)}} removeOption={(this.props.isAdmin&&this.state.users[i].access!==1)} info={this.state.users[i]} height={"240px"}/></div>
		}
        return (
            <div className="usersBody">
                <h1>Hantera användare</h1>
                <img alt="" className="arrowsUsers" id="firstArrow" src={arrow_back} onClick={() => this.scrollSide(-1)} style = {this.state.arrowStyle.left}/>
                <div className="usersContainer" ref={this.blocksContainerRef} >
                    {renderUsers}
                </div>
                <img alt="" className="arrowsUsers" id="secondArrow" src={arrow_forward}onClick={() => this.scrollSide(1)} style = {this.state.arrowStyle.right}/>
            </div>
        );
        }
}

export default UserDisplay;
