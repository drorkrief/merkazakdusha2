import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class OneCard extends Component {
    render() {
        let it = this.props.product;
        let style1 = {
            paddingTop: "10px",
            paddingRight: "10px",
            float: "right",
            
            height: "26rem",
            cursor: "pointer"
          };
          let style2 = {
            width: "15rem",
            height: "23rem"
          }
        return (
            <div>
                
        <div  style={style1}>
          <Card
            // key={index}
            style={style2}
            // onMouseOver={()=>{return style={boxShadow: "6px 5px 20px 0px black"}}}
            // style={linkStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}
            onClick={() => {
              this.setState({ redirect: !this.state.redirect });
              this.props.currentItem(it);
            }}
          >
            <Card.Img variant="top" src={"." + it.imgurl} />
            <Card.Body variant="bottom">
              <Card.Title alt={it.name} >
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
            </div>
        );
    }
}

export default OneCard;