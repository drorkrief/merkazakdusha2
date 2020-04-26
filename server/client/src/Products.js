import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Redirect, withRouter } from "react-router-dom";

class Products extends Component {
  state = { it: [], cyrrentCtgry: "", redirect: true, products: undefined };
  cat = "";
  cartList = "";
  productsList = "";
  getImageFromServer = (item) => {
    console.log(item, "===item");
    
    axios
      .get(`/images/${item}`, { responseType: "blob" })
      .then(res => {
        if (res.status === 200) {
          const reader = new FileReader();
          reader.readAsDataURL(res.data);
          const _this = this;
          reader.onload = function(){
              const imageDataUrl = reader.result;
              _this.setState({ttt:imageDataUrl});
          }

        } else {
          console.log(`error status code : ${res.status}`);
        }
      })
      .catch(err => console.log(err));
  };
  getCategories = () => {
    axios
      .get("/categories")
      .then(res => {
        
        this.setState({ categories: res.data.res });
        
      })
      .catch(err => console.log(err));
    
  };
  componentWillMount() {
    this.getCategories();
  }

  componentDidUpdate() {
    if (this.props.category !== this.state.cyrrentCtgry) {
      this.getProducts(this.props.category);
      this.setState({ cyrrentCtgry: this.props.category });
    }
  }
  getProducts = ctgry => {
    axios
      .get(`/products/?category=${ctgry}`)
      .then(res => {
        
        this.setState({ products: res.data.res });
        
      })
      .catch(err => console.log(err));
  };

  render() {
    let style2 = {
        width: "15rem",
        height: "23rem"
      },
      direct = this.state.redirect ? (
        ""
      ) : (
        <Redirect
          to={{
            pathname: "/Product"
          }}
        />
      );
    

    if (this.state.categories) {
      this.cat = this.state.categories.map((it, index) => (
        <Button
          value={it.ename}
          onClick={() => {
           
            this.props.history.replace("/Products/" + it.ename);
          }}
          className="btnCateg"
          key={index}
          variant="info"
        >
          {it.name}
        </Button>
      ));
    }
    if (this.state.products) {
      let style1 = {
        paddingTop: "10px",
        paddingRight: "10px",
        float: "right",
        
        height: "26rem",
        cursor: "pointer"
      };
      this.productsList = this.state.products.map((it, index) => (
        <div key={index} style={style1}>
          <Card
            key={index}
            style={style2}
            // onMouseOver={()=>{return style={boxShadow: "6px 5px 20px 0px black"}}}
            // style={linkStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}
            onClick={() => {
              this.setState({ redirect: !this.state.redirect });
              this.props.currentItem(it, this.state[it.imgurl]);
            }}
          >
            {console.log(this.state.ttt)
            }
            {this.state.ttt ? "":this.getImageFromServer(it.imgurl)}
            <Card.Img variant="top" src={this.state.ttt} />
            <Card.Body variant="bottom">
              <Card.Title alt={it.name} key={index}>
                {it.name}
              </Card.Title>
              {/* <Card.Text style={{ overflow: "auto" }}>
                {it.description}
              </Card.Text> */}
              <Row style={{ bottom: 10, position: "absolute" }}>
                <Col>
                  <Button
                    onClick={e => {
                      // console.log(it._id);
                      it.currentImg=this.state[it.imgurl];
                      this.props.addToCart(it);
                      // let tempArry=this.state.products;
                      // tempArry[index].onCart=true;
                      // console.log(tempArry[index],"---tempArry");
                      // this.setState({products : tempArry });
                      // console.log(this.state.products,"-----state");

                      e.stopPropagation();
                    }}
                    variant="primary"
                  >
                    הוסף לסל
                  </Button>
                  {/* {!this.state.products[index].onCart?
                
                :<Button variant="danger"  onClick={e => {
                  // console.log(it._id);
                  // this.props.addToCart(it);
                  let tempArry=this.state.products;
                  tempArry[index].onCart=false;
                  console.log(tempArry[index],"---tempArry");
                  this.setState({products : tempArry });
                  console.log(this.state.products,"-----state");
                  
                  e.stopPropagation();
                }}> הסר מהסל</Button>
              } */}
                </Col>
                <Col>מחיר:{it.price}</Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
        //         <div className="prdcts" key={index}>
        //           {it.name}
        //           <br />
        //           מחיר:{it.price}
        //           <br />
        //           מותג של:{it.brand}
        //           <img alt={it.name} src={it.imgurl} />
        //           <br />
        // {it.description}
        // <br />
        // <button onClick={()=>{console.log(it.name);
        // }}>הוסף לסל</button>
        //         </div>
      ));
    }

    return (
      <div>
                

        {direct}
        <ButtonGroup aria-label="Basic example">{this.cat}</ButtonGroup>
        <div>{this.productsList}</div>
      </div>
    );
  }
}
export default withRouter(Products);
// export default Products;
