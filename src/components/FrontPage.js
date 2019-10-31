import React from 'react';
import './FrontPage.css';
import CoverPage from './CoverPage.js'
import ChatBar from './ChatBar.js'
import ContactSection from './ContactSection.js'
import CarModels from './CarModels.js'
import Employees from './Employees.js'

class FrontPage extends React.Component {
    constructor(props){
            super(props)
            this.state = {
                NavigationBarBackground:{
                    backgroundColor :"transparent",
                },
                menuColor:"#ffffff",
                coverHeight: 500,
            }
            this.refCarModels = React.createRef()
            this.refContact = React.createRef()

            this.setCoverHeight = this.setCoverHeight.bind(this);
        }

		componentDidMount(){
                window.addEventListener('scroll', this.scrollWindow)
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
                        <div className="WelcomeSection">
                            <CoverPage scrollfromParent={()=>{window.scrollTo(0, this.refCarModels.current.offsetTop)}} setCoverHeight={this.setCoverHeight}/>
                        </div>

                        <div className="contentsSections" ref={this.refCarModels}>
                            <CarModels/>
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
