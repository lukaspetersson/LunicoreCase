import React from 'react';
import './CarModels.css';
import car_icon from "./../assets/car_icon.svg"
import arrow_back from "./../assets/arrow_back.svg"
import arrow_forward from "./../assets/arrow_forward.svg"
import SmallBlock from "./SmallBlock.js";

class CarModels extends React.Component {
    constructor(props){
            super(props)
            this.state = {
                car:{
                    first:"BMV"+"turbo",
                    second:"20000",
                    image: {
                      front: car_icon,
                    }
                },
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
    }

    componentDidMount() {
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
        return (
            <div className="carBody">
                <h1>CARMODELS</h1>
                <img alt="" className="arrowsCar" id="firstArrow" src={arrow_back} onClick={() => this.scrollSide(-1)} style = {this.state.arrowStyle.left}/>
                <div className="carContainer" ref={this.blocksContainerRef} >
                    <div className="car">
                        <SmallBlock info={this.state.car} height={"280px"}/>
                    </div>
                    <div className="car">
                        <SmallBlock info={this.state.car} height={"280px"}/>
                    </div>
                    <div className="car">
                        <SmallBlock info={this.state.car} height={"280px"}/>
                    </div>
                    <div className="car">
                        <SmallBlock info={this.state.car} height={"280px"}/>
                    </div>
                </div>
                <img alt="" className="arrowsCar" id="secondArrow" src={arrow_forward}onClick={() => this.scrollSide(1)} style = {this.state.arrowStyle.right}/>
            </div>
        );
        }
}

export default CarModels;
