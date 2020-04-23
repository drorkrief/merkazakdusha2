import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

class Product extends Component {
 
  goBack() {
    // this.props.history.goBack();
    if(this.props.currentItem){

      this.props.history.push('/Products/'+this.props.currentItem.category);
    }
  }
 
  render() {
    let style={
      width:"70%"
     }
    return (
      <div style={{textAlign:"center"}}>
        <Jumbotron>
          <h1 className="h3" >
            {this.props.currentItem ? this.props.currentItem.name : ""}
          </h1>
          <img
            style={style}
            alt={this.props.currentItem ? this.props.currentItem.name : ""}
            variant="top"
            src={
              this.props.currentItem ?  this.props.currentItem.currentImg : ""
            }
          />
          <h3 className="h5">
            {this.props.currentItem ? this.props.currentItem.description : ""} :תיאור 
          </h3>
          <h3 className="h5">
            {this.props.currentItem ? this.props.currentItem.price : ""} :מחיר
          </h3>
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
          {/* <button
        className="button icon-left"
        onClick={this.context.router.history.goBack}>
          Back
      </button> */}
        </Jumbotron>
       
      </div>
    );
  }
}

export default withRouter(Product);
