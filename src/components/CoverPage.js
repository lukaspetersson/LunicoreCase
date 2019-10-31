import React from 'react';
import './CoverPage.css';
import down_logo from "./../assets/down_logo.png"


class CoverPage extends React.Component {
    constructor(props){
            super(props)
			this.state={
				showLogin:false
			}
            this.refAboutText = React.createRef()
			this.refContainer = React.createRef()
    }
    componentDidMount(){
        if(this.refAboutText.current){
          this.props.setCoverHeight(window.innerHeight - this.refAboutText.current.clientHeight - 40)
        }
         this.forceUpdate()
         window.addEventListener('resize', ()=>{this.forceUpdate()})
    }

    componentWillUnmount() {
        window.removeEventListener('resize', ()=>{this.forceUpdate()})
    }
    render() {
        if(this.refAboutText.current){
          var meHeight = this.refAboutText.current.clientHeight;
        }
			return (
	          <div>
	            <div className="coverBody" style={{bottom: meHeight}}>
	                 <img alt="" className="downBtn" src={down_logo} onClick={() => this.props.scrollfromParent()} />
	            </div>
	            <div className="infoContainerCover" ref={this.refAboutText}>
	              <h1>Bil-Månsson</h1>
	              <h3>Privatleasa enkelt din nya begagnade bil med Bil-Månsson Komplett Privatleasing. Du väljer mellan 24 eller 36 månaders avtalslängd och bestämmer själv din årliga körsträcka. När avtalsperioden löpt ut lämnar du enkelt tillbaka bilen och kan ta ut en ny.</h3>
	            </div>
	            </div>
	        );

    }
}

export default CoverPage;
