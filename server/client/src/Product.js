import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import ShowImg from "./ShowImg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Product extends Component {
 
  goBack() {
    // this.props.history.goBack();
    if(this.props.currentItem){

      this.props.history.push('/Products/'+this.props.currentItem.category);
    }
  }
 
  render() {
    
    return (
      <div style={{textAlign:"center"}}>
        <Jumbotron>
          <h1 className="h3" >
            {this.props.currentItem ? this.props.currentItem.name : ""}
          </h1>
          <Container>
  <Row>
    <Col> <h3 className="h5">
            &nbsp;
            תיאור:  
            { this.props.currentItem ? this.props.currentItem.description : ""}
          </h3>
         
          <h3 className="h5">
            {this.props.currentItem ? this.props.currentItem.price : ""} :מחיר
          </h3>
          <h3 className="h5">
            {this.props.currentItem ? this.props.currentItem.size : ""} :גודל
          </h3>
          <h3 className="h5">
            {this.props.currentItem ? this.props.currentItem.mkt : ""} :מק"ט
          </h3>
          <div style={{position:"absolute",bottom:"0"}}>
          <Button
                    style={{width:"15vw", minWidth:"100px"}}
                    onClick={e => {
                      if(this.props.currentItem){
                        
                        this.props.addToCart(this.props.currentItem);
                        e.stopPropagation();
                      }
                    }}
                    variant="primary"
                    >
            הוסף לסל
          </Button>
          <Button
          style={{marginLeft:"3vw" , width:"15vw", minWidth:"100px"}}
          onClick={e => {
            this.goBack();
            e.stopPropagation();
          }}
          variant="secondary"
          >
            חזור
          </Button>
          
                    </div>
         
          </Col>
    <Col>
          {this.props.currentItem ? <ShowImg imgName={this.props.currentItem.imgurl} /> : ""}
    </Col>
  </Row>
  <Row>
    <Col></Col>
  </Row>
</Container>

         
        </Jumbotron>
       
      </div>
    );
  }
}

export default withRouter(Product);
