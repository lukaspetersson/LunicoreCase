import React from 'react';
import './ContactSection.css';
import email_logo from "./../assets/email_logo.png"
import location_icon from "./../assets/location_icon.png"

class ContactSection extends React.Component {
    constructor(props){
            super(props)
            this.state = {}
    }
    render() {
        return (
            <div className="contactBody">
                <div className="withText">
                    <img alt="" src={email_logo}/>
                    <p>info@lunicar.se</p>
                </div>
                <div className="withText">
                    <img alt="" src={location_icon}/>
                    <p>Sandgatan 2, 223 50 Lund</p>
                </div>
            </div>
        );
    }
}

export default ContactSection;
