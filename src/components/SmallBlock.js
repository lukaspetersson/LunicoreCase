import React from 'react';
import './SmallBlock.css';

class SmallBlock extends React.Component {
    render() {
		return (
  		  <div className="card" style={{height:this.props.height}}>
  				<div className="SmallBlock" style={{height:this.props.height}}>
  					<img alt="" src={this.props.info.image.front}/>
  					 <p>{this.props.info.year}</p>
  					<p>{this.props.info.description}</p>
  				</div>
  		  </div>
  	  );
  }
}

export default SmallBlock;
