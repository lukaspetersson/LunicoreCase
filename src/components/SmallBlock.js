import React from 'react';
import './SmallBlock.css';

class SmallBlock extends React.Component {
    render() {
		return (
  		  <div className="card" style={{height:this.props.height}}>
  				<div className="SmallBlock" style={{height:this.props.height}}>
  					<img alt="" src={this.props.info.image}/>
  					 <p>{this.props.info.first}</p>
  					<p>{this.props.info.second}</p>
  				</div>
  		  </div>
  	  );
  }
}

export default SmallBlock;
