import React, { Component } from "react";
// import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import CategoryList from "./CategoryList";

class Home extends Component {
  
  state = { data: "", pic: "", products: [], category: [] };
  url = "/pic";
  
  
  render() {
    return (
      <div style={{paddingTop:"20px"}}>
                

        <Carousel >
          <Carousel.Item >
            <img
              className="d-block w-100"
              src="/images1/theStore.jpeg?text=First slide"
              alt="First slide"
            />
            <Carousel.Caption >
              {/* <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images1/theStore2.jpeg"
              alt="Third slide"
            />

            <Carousel.Caption>
              {/* <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images1/theStore3.jpeg?text=Third slide"
              alt="Third slide"
            />

            <Carousel.Caption>
              {/* <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div>
        {this.props.category? this.props.category.map((it, index) => (<CategoryList  key={index} category={it} />)):""}
        </div>
        
      </div>
    );
  }
}

export default Home;
