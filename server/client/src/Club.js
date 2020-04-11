import React, { Component  } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";



// import useState from "react-bootstrap/useState";

import axios from "axios";


class Club extends Component {
  
  state={sendEmailes: true , err: false}
  postContact = e => {
    // var bodyFormData = new FormData();
    // bodyFormData.set("firstName", "Fred");
    // bodyFormData.set("lastName", "Flintstone");
    e.preventDefault();
    
    axios.post('/contact', {
      email: this.state.email,
      massage: this.state.massage,
      sendEmailes: this.state.sendEmailes,
      phone: this.state.phone,
      name1: this.state.name1
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
      

    });  };

  render() {
    return (
      <div className="container">
        {this.state.err?  <Alert variant="danger" onClose={() => { this.setState(prevState => ({
        err: !prevState.err
      }))}} dismissible>
<Alert.Heading>!שים לב</Alert.Heading>
<p>
  חובה למלא את שני השדות: אימייל והודעה
</p>
</Alert> : 
       
          <Form onSubmit={this.postContact}>
            <Form.Group controlId="formBasicEmail">
              <h1>:צור קשר ישיר איתנו</h1>
              <Form.Label>הכנס כתובת אימייל</Form.Label>
              <Form.Control style={{textAlign: "right"}}  onChange={e => {this.setState({email: e.target.value})}} type="email" placeholder="כתובת אימייל" required/>
              <Form.Text className="text-muted">
                .אנו לא עושים שימוש אסור בכתובתך
              </Form.Text>
            </Form.Group>
            <Row>
    <Col>
    <Form.Label>:הכנס את שמך</Form.Label>
      <Form.Control style={{textAlign: "right"}} onChange={e => {this.setState({name1: e.target.value})}}  type="text" placeholder="שם" required/>
    </Col>
    <Col>

    <Form.Label>:טלפון</Form.Label>
      <Form.Control onChange={e => {this.setState({phone: e.target.value})}} type="tel"  placeholder="05********" pattern="[0]{1}[5]{1}[0-9]{8}"
maxLength="10"  title="הכנס מספר סלולרי תקין (עם קידומת)" required/>
    </Col>
  </Row>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>:הכנס את הודעתך</Form.Label>
              <Form.Control  onChange={e => {this.setState({massage: e.target.value})}} as="textarea" rows="3" required/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check checked={this.state.sendEmailes}  onChange={e => {this.setState({sendEmailes: e.target.checked})}} type="checkbox" label="שלח לי הטבות למייל" />
            </Form.Group>
            <Button variant="primary" type="submit">
              שלח
            </Button>
          </Form>
        }
        
      </div>
    );
  }
}

export default Club;
