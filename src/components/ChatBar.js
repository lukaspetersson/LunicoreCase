import React from 'react';
import './ChatBar.css';

class ChatBar extends React.Component {
    constructor(props){
            super(props)
            this.state = {
                chatVisibility: false,
                chatContainerClass: "chatContainer",
                chatContainerContentClass: "chatContainerContent",
                menuSize:null,
            }
            this.visibilityToggle = this.visibilityToggle.bind(this)
            this.renderInfo = this.renderInfo.bind(this)
    }

    renderInfo() {
        const menu = document.querySelector('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4');
        menu.classList.toggle("open");
        this.setState({
            chatContainerClass: this.state.chatContainerClass === "chatContainer" ? "chatContainer open" : "chatContainer",
            chatContainerContentClass: this.state.chatContainerClass === "chatContainer" ? "chatContainerContent open" : "chatContainerContent",
        })
    }

    visibilityToggle(){
        this.setState({
            chatVisibility: !this.state.chatVisibility
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
              menuSize:0,
            })
        }else if(window.innerWidth < 800){
          this.setState({
            menuSize:20,
          })
        }else{
            this.setState({
              menuSize:50,
            })
        }
    }

    render() {
        if(this.state.chatContainerClass === "chatContainer open"){
            var background = <div className="outsideSpace" onClick={this.renderInfo}></div>
        }
        return (
            <div className="chatBar">
               <div className={this.state.chatContainerClass} style={{right: this.state.menuSize+"vw", height: this.state.chatContainerClass === "chatContainer" ? "20vh" : "100vh"}}>
                    <div id="nav-container" onClick={this.renderInfo} >
                        <div id="nav-icon1">
                            <span style={{backgroundColor: this.state.chatContainerClass === "chatContainer open" ? "white" : this.props.menuColor}}></span>
                            <span style={{backgroundColor: this.state.chatContainerClass === "chatContainer open" ? "white" : this.props.menuColor}}></span>
                            <span style={{backgroundColor: this.state.chatContainerClass === "chatContainer open" ? "white" : this.props.menuColor}}></span>
                        </div>
                    </div>
                    <div className={this.state.chatContainerContentClass}>
                        <div className="infoDisplay">
                            <h1>CHAT</h1>
                        </div>
                        <div className="divider"/>
                        <div className="filesDisplay">
                        +wj+d0jwj+w0djwj+
                        </div>
                    </div>
                </div>
                {background}
            </div>
        );
    }
}

export default ChatBar;
