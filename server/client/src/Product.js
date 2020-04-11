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
    return (
      <div>
        <Jumbotron>
          <h1 className="h3">
            {this.props.currentItem ? this.props.currentItem.name : ""}
          </h1>
          <img
            alt={this.props.currentItem ? this.props.currentItem.name : ""}
            variant="top"
            src={
              this.props.currentItem ? "." + this.props.currentItem.imgurl : ""
            }
          />
          <h3 className="h5">
            {this.props.currentItem ? this.props.currentItem.description : ""}
          </h3>
          <h3 className="h5">
            {this.props.currentItem ? this.props.currentItem.price : ""} :מחיר
          </h3>
          <Button
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
