import React, { Component } from "react";
import { FaShekelSign } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

class CheckOut extends Component {
  state = {
    cartList: this.props.cartList,
    sumCart: 0,
    delivery: "selfPickup",
    isOrdered: false,
    deliveryPrice:0
  };
  sumCart = 0;

  sendOrder = event => {
    let orderObj ={delivery :this.state.delivery , items:[] ,sumCartAndDelivery : (this.state.deliveryPrice +this.state.sumCart)}
    for (let index = 0; index < this.state.cartList.length; index++) {
      const element = this.state.cartList[index];
      orderObj.items[index] = {id:element._id , quantity:element.quantity }
    }
    orderObj.user= this.state.user;
    console.log({
      user:this.state.user,
      order:orderObj
    } );
    
    event.preventDefault();
    axios.post('/order', {
      user:this.state.user,
      order:orderObj
    })
    .then( (response) =>{
      console.log(response.status);
      this.setState({email:""})
      this.setState({massage:""})
alert("תודה")
    })
    .catch( (error)=> {
      this.setState(prevState => ({
        err: !prevState.err
      }))

      console.log(error);
      

    });
    // console.log(this.state.sumCart ,this.state.delivery , this.state.cartList );
    this.props.deletAllCartList()
    this.setState({ isOrdered: true });
    // this.props.deletAllCart()

  };
  calculateSum = () => {
    this.setState({ sumCart: 0 });
    // this.state.sumCart = 0;
    if (this.props.cartList) {
      let list = this.props.cartList;
      for (let item = 0; item < list.length; item++) {
        let sum2 = list[item].price * list[item].quantity;
        // this.state.sumCart += sum2;
        this.setState(prevState => {
          return {
            // we must return an object for setState
            sumCart: prevState.sumCart + sum2
          };
        });
      }
      //   console.log(this.state.sumCart);
    }
  };
  componentWillReceiveProps() {
    this.calculateSum();
  }
  componentDidMount() {
    this.calculateSum();
  }
  setDelivery(event) {
    this.setState({ delivery: event.target.value });
    console.log(event.target.title);
    this.setState({ deliveryPrice: Number(event.target.title) });
    
    // console.log(this.state.delivery);
  }

  render() {
    return (
      <div className="container">
        <hr />
        {this.state.isOrdered ? (
          <div className="container">
            <h1>תודה שבחרת לקנות אצלינו</h1>
            <h3>ההזמנה תצא לדרך תוך 2 ימי עסקים</h3>
            <Container>
            {this.state.cartList.map((it,index) => (<Row key={index}><Col>{it.quantity}</Col><Col sm={4}>{it.name}</Col></Row>))}
            </Container>
        <h3 style={{textAlign:"center"}}>
        &nbsp;<FaShekelSign />&nbsp;
          {(this.state.sumCart + Number(this.state.deliveryPrice)).toFixed(2)} &nbsp;:&nbsp;
          סך הכל
        </h3>
          </div>
        ) : (
          <div>
            <h3>
              <span style={{ fontSize: "20px", verticalAlign: "5px" }}>
                &nbsp;
                <FaShekelSign />
                &nbsp;
              </span>
              {(this.state.sumCart + Number(this.state.deliveryPrice)).toFixed(2)} סך הכל
            </h3>

            {/* {console.log(this.props.cartList),
                this.calculateSum
                 } */}
            <div className="jumbotron">
              <h3>:סיכום</h3>
              <h4>:שיטת משלוח</h4>
              <br />

              <form
                onSubmit={this.sendOrder} //onSubmit="return false"
                style={{ direction: "rtl", fontSize: "17px" }}
                // onChange={e => {this.setState({delivery : e.target.value }); }}
              >
                <div onChange={this.setDelivery.bind(this)}>
                  <input
                    defaultChecked
                    type="radio"
                    name="gender"
                    value="selfPickup"
                  />{" "}
                  איסוף עצמי
                  <span title={0}
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "7px",
                      paddingRight: "3px",
                      paddingLeft: "3px",
                      marginRight: "8px"
                    }}
                  >
                    חינם
                  </span>
                  <br />
                  <input title={19}
                    type="radio"
                    name="gender"
                    value="regularDelivery"
                  />{" "}
                  משלוח רגיל
                  <span
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "7px",
                      paddingRight: "3px",
                      paddingLeft: "3px",
                      marginRight: "8px"
                    }}
                  >
                    19 ₪
                  </span>
                  <br />
                  <input title={45} type="radio" name="gender" value="fastShipping" />{" "}
                  משלוח מהיר
                  <span
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "7px",
                      paddingRight: "3px",
                      paddingLeft: "3px",
                      marginRight: "8px"
                    }}
                  >
                    45 ₪
                  </span>
                  <br />
                </div>
                <Container>
                  <Row style={{ marginTop: "1vw" }}>
                    <Col sm={3}>שם</Col>
                    <Col>
                      <input
                        onChange={e => {
                          let currentValue = e.target.value;
                          // this.setState({ user: { name: e.target.value } });
                          this.setState(prevState => ({
                            user: {
                              // object that we want to update
                              ...prevState.user, // keep all other key-value pairs
                              name: currentValue // update the value of specific key
                            }
                          }));
                        }}
                        className="checkOutInput"
                        type="text"
                        title="שם מלא"
                        required
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "1vw" }}>
                    <Col sm={3}>דואר אלקטרוני</Col>
                    <Col>
                      <input
                        onChange={e => {
                          let currentValue = e.target.value;
                          // this.setState({ user: { name: e.target.value } });
                          this.setState(prevState => ({
                            user: {
                              // object that we want to update
                              ...prevState.user, // keep all other key-value pairs
                              email: currentValue // update the value of specific key
                            }
                          }));
                        }}
                        className="checkOutInput"
                        type="email"
                        title="אימייל"
                        required
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "1vw" }}>
                    <Col sm={3}>טלפון</Col>
                    <Col>
                      <input
                        onChange={e => {
                          let currentValue = e.target.value;
                          // this.setState({ user: { name: e.target.value } });
                          this.setState(prevState => ({
                            user: {
                              // object that we want to update
                              ...prevState.user, // keep all other key-value pairs
                              phone: currentValue // update the value of specific key
                            }
                          }));
                        }}
                        className="checkOutInput"
                        type="tel"
                        title="מספר טלפון"
                        required
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "1vw" }}>
                    <Col sm={3}>כתובת</Col>
                    <Col>
                      <input
                        onChange={e => {
                          let currentValue = e.target.value;
                          // this.setState({ user: { name: e.target.value } });
                          this.setState(prevState => ({
                            user: {
                              // object that we want to update
                              ...prevState.user, // keep all other key-value pairs
                              address: currentValue // update the value of specific key
                            }
                          }));
                        }}
                        className="checkOutInput"
                        type="text"
                        title="כתובת למשלוח"
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "1vw" }}>
                    <Col sm={3}>הערות</Col>
                    <Col>
                      <input
                        onChange={e => {
                          let currentValue = e.target.value;
                          // this.setState({ user: { name: e.target.value } });
                          this.setState(prevState => ({
                            user: {
                              // object that we want to update
                              ...prevState.user, // keep all other key-value pairs
                              note: currentValue // update the value of specific key
                            }
                          }));
                        }}
                        className="checkOutInput"
                        type="text"
                        title="הכנס הערה"
                        // pattern="[A-Za-z0-9]{10}"
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "1vw" }}>
                    <Col>
                      <input
                        type="submit"
                        //onClick={this.sendOrder()}    onSubmit={this.sendOrder()}
                      />
                    </Col>
                  </Row>
                </Container>
              </form>
              <br />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CheckOut;
