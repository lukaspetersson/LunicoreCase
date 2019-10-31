import React from 'react';
import './SmallBlock.css';
import delete_icon from "./../assets/delete_icon.png"


class SmallBlock extends React.Component {
    render() {
		var showCross = "hidden"
		if(this.props.removeOption){
			showCross = "visible"
		}
		return (
  		  <div className="card" style={{height:this.props.height}}>
  				<div className="SmallBlock" style={{height:this.props.height}}>
					<img alt="" className="cross" style={{visibility:showCross}} src={delete_icon} onClick={() => this.props.removeFunction(this.props.info.id)}/>
  					<img alt="" className="displayImg" src={this.props.info.image}/>
  					 <p>{this.props.info.first}</p>
  					<p>{this.props.info.second}</p>
  				</div>
  		  </div>
  	  );
  }
}

export default SmallBlock;
