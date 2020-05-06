import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Redirect } from "react-router-dom";

class CategoryList extends Component {
  state = { image: "", redirect: true };
  theCategory = this.props.category ? this.props.category : "";
  componentDidMount() {
    this.getProductImg();
  }
  
  getProductImg = () => {
    // console.log(this.props.category.ename, "this.props.category");

    axios
      .get(`/productImg/${this.props.category.ename}`)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ imgName: res.data });
          this.getImgFile(res.data);
        } else {
          console.log(`error status code : ${res.status}`);
        }
      })
      .catch((err) => console.log(err));

  };
  getImgFile = (imgName) => {
    if (imgName){

      axios
      .get(`/images/${imgName}`, { responseType: "blob" })
      .then((res) => {
        if (res.status === 304 || res.status === 200) {
          const reader = new FileReader();
          reader.readAsDataURL(res.data);
          let _this = this;
          reader.onload = function () {
            const imageDataUrl = reader.result;
            _this.setState({ imgToShow: imageDataUrl });
          };
        } else {
          console.log(`error status code : ${res.status}`);
        }
      })
      .catch((err) => console.log(err));
    } 
  }
  render() {
    let direct = this.state.redirect ? (
      ""
    ) : (
      <Redirect
        to={{
          pathname: `/Products/${this.theCategory.ename}`,
        }}
      />
    );
    return (
      <div className="categorylist" style={{ display: "inline-block" }}>
        {direct}
        <Card
          style={{ height: "10rem", width: "10rem", margin: "10px" }}
          onClick={() => {
            this.setState({ redirect: !this.state.redirect });
          }}
        >
          {this.state.imgToShow ? (
            <Card.Img height='150rem'  variant="top"  src={this.state.imgToShow}/>
          ) : (
            <div
              style={{ margin: "auto" }}
              className="spinner-border"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          )}

          <Card.Body>
            {this.theCategory.ename ? (
              <Card.Title style={{ textAlign: "center" }}>
                {this.theCategory.ename ? this.theCategory.name : ""}
              </Card.Title>
            ) : (
              ""
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CategoryList;
