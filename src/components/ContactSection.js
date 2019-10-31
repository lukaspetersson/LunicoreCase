import React from 'react';
import './ContactSection.css';
import email_logo from "./../assets/email_logo.png"
import phone_logo from "./../assets/phone_logo.png"

class ContactSection extends React.Component {
    constructor(props){
            super(props)
            this.state = {}
    }
    render() {
        return (
            <div className="contactBody">
                <h1>Contact</h1>
                <div className="withText">
                    <img alt="" src={email_logo}/>
                    <p>bilmeckare@lunicore.se</p>
                </div>
                <div className="withText">
                    <img alt="" src={phone_logo}/>
                    <p>+46707898860</p>
                </div>
            </div>
        );
    }
}

export default ContactSection;
