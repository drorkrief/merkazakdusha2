import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios"
class Login extends Component {
    state={password:"", email:"" };
    sendUser= () => {console.log(this.state.email,this.state.password);
        axios.post('/login', {
            password: this.state.password,
            email: this.state.email
          })
          .then( (response) => {
            console.log(response.status);
            // this.props.setUser(response)
            response.status?console.log(response.status,"ok"):console.log(response.status,"bad");
            
            
          })
          .catch( (error) => {
              alert("הסיסמה לא נכונה")
            console.log(error);
          });
        this.props.handleClose();
    };

    render() {
        return (
            <div>
                 <Modal.Body>
              <h4>כדי להכנס למערכת עליך להזדהות</h4>
                 <Form>
  <Form.Group controlId="formBasicEmail">
  <Form.Label>אימייל</Form.Label>
    <Form.Control style={{direction:"ltr"}} type="email"  onChange={(e)=>{this.setState({ email: e.target.value  });}}/>
    
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>סיסמה</Form.Label>
    <Form.Control type="password" placeholder="הכנס סיסמה" onChange={(e)=>{this.setState({ password: e.target.value  });}}/>
  </Form.Group>
  
</Form>
</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              סגור
            </Button>
            <Button disabled={!this.state.password || !this.state.email} variant="primary" onClick={  this.sendUser }>
              שלח
            </Button>
          </Modal.Footer>
            </div>
        );
    }
}

export default Login;