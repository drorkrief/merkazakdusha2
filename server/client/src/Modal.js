import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";

import React,  { useState } from "react";
import {FaUserAlt } from "react-icons/fa";
import Login1 from "./Login";
function Modal1() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
      <>
        <span onClick={handleShow} className="button1 links"><FaUserAlt /></span>
          
        
  
        <Modal style={{direction:"rtl"}} show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title style={{textAlign:"center"}}>כניסת מנהל</Modal.Title>
          </Modal.Header>
         
         <Login1  handleClose={handleClose}/>
         
        </Modal>
      </>
    );
  }
  export default Modal1;