import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./HeaderNavBar.css";
import {
  FaUserAltSlash,
  FaFileSignature,
  FaFacebookSquare,
  FaWaze,
  FaPhone,
  FaRegAddressCard,
  FaUserAlt
} from "react-icons/fa";
import { FiShoppingCart, FiWatch, FiSettings } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegNewspaper } from "react-icons/fa";

class HeaderNavBar extends Component {
  state = { sidebarOpen: false, formOpen: true };

  loginReq = event => {
    event.preventDefault();
// === send login to server

axios.post('/login', {
  email:this.state.email,
  password:this.state.password
})
.then( 
  (response) => {
    // console.log(response.status);
    // console.log(response.data);
    this.props.setSecretKey(response.data)
    
    this.setState({ logedin: true })
  }
)
.catch( (error)=> {
  
  console.log(error);
  

});

    console.log(event.type);
    this.setState({ formOpen: !this.state.formOpen })
  }

  render() {
    // console.log(this.props.categories);
    return (
      <div>
        <div
          className="formLogin"
          style={
            this.state.formOpen ? { display: "none" } : { display: "grid" }
          }
        >
          <form onSubmit={this.loginReq}>
            <h2>כניסת מנהל</h2>
          
          <label htmlFor="email">
            <b>דואר אלקטרוני</b>
          </label>

          <input onChange={event =>{this.setState({ email: event.target.value });}} type="text" placeholder="הכנס אימייל" name="email" required />
          <label htmlFor="psw">
            <b>סיסמה</b>
          </label>
          <input onChange={event =>{this.setState({ password: event.target.value });}} type="password" placeholder="הכנס סיסמה" name="psw" required />
          <br />
          <button type="submit" className="btn btn-secondary">
            התחבר
          </button>
          <br />
          <button
            type="button"
            className="btn cancel btn-warning"
            onClick={() => {
              this.setState({ formOpen: !this.state.formOpen });
            }}
          >
            סגור
          </button>
          </form>
        </div>
        <div className="header3">
          <img alt="icon" src={`../images1/metal-2735777_1920.jpg`} />
          <div className="header2">
            {this.state.logedin?  <Link className="links button1" to="/AdminPanel"
            >
              <FiSettings />
            </Link> : "" }
            {this.state.logedin?
            <span
            className="links button1"
            
            onClick={() => {
              this.setState({ logedin: !this.state.logedin });
            }}
            //to="/AdminPanel"
          >
            <FaUserAltSlash />
          </span> 
            : 
            <span
              className="links button1"
              
              onClick={() => {
                this.setState({ formOpen: !this.state.formOpen });
              }}
              //to="/AdminPanel"
            >
              <FaUserAlt />
            </span>
            }

            <a
              target="_blank"
              rel="noopener noreferrer"
              className="links button1"
              href="https://www.facebook.com/merkazhakdushasderot/"
            >
              <FaFacebookSquare />
            </a>

            <Link className="links button1" to="/Address">
              <FaWaze />
            </Link>

            <Link className="links button1" to="/Contact">
              <FaPhone />
            </Link>

            <Link className="links button1" to="/Cart">
              <FiShoppingCart />
            </Link>

            <span
              onClick={() => {
                this.setState({ sidebarOpen: true });
              }}
              className="links button1"
            >
              <GiHamburgerMenu />
            </span>
          </div>
          <div className="header1">
            <div className="secBar">
              <div>
                <Link to="/Subscibe">
                  מועדון &nbsp;
                  <FaRegAddressCard />
                </Link>
              </div>
              <div>
                <Link to="/Feed">
                  מאמרים &nbsp;
                  <FaRegNewspaper />
                </Link>
              </div>
              <div>
                <Link to="/Terms">
                  תנאים &nbsp;
                  <FaFileSignature />
                </Link>
              </div>
              <div>
                <Link to="/Schedule">
                  שעות פעילות &nbsp;
                  <FiWatch />
                </Link>
              </div>
            </div>
            <Link to="/">
              <img alt="icon2" className="icon1" src="/images1/logo1.jpeg" />
            </Link>
          </div>
        </div>
        {this.state.sidebarOpen ? (
          <div className="sidenav width250">
            <span
              // href="javascript:void(0)"
              className="closebtn"
              onClick={() => {
                this.setState({ sidebarOpen: false });
              }}
            >
              &times;
            </span>
            <h2 style={{ color: "white", textAlign: "center" }}>קטגוריות</h2>
            {this.props.categories
              ? this.props.categories.map((it, index) => (
                  <Link
                    onClick={() => {
                      this.setState({ sidebarOpen: false });
                    }}
                    to={"/Products/" + it.ename}
                    key={index}
                  >
                    {it.name}
                  </Link>
                ))
              : null}
          </div>
        ) : (
          <div className="sidenav">
            <span 
            // href="javascript:void(0)" 
            className="closebtn width0">
              &times;
            </span>
          </div>
        )}
        <div style={{ height: "140px" }}></div>
      </div>
    );
  }
}

export default HeaderNavBar;
