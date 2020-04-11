import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Club from "./Club";
class Contact extends Component {
  render() {
    return (
      <div>
        {" "}
        
        <div style={{paddingTop:"20px"}} className="container rtl">
          <div className="jumbotron rtl">
            <h1 style={{ textAlign: "center" }}>שמור על קשר</h1>
            <br />
            <hr />
            <Row>
              <Col>
                <h2 className="rtl">:טלפון</h2>
                <p>050-633-6828</p>
                <p>08-68-99-600</p>
              </Col>
              <Col>
                <h2 className="rtl">כתובתינו</h2>
                <p>רח' בן יהודה 14 שדרות</p>
                <p>
                  <a href="https://tinyurl.com/u4d8689">
                    <img
                      className="icon2"
                      alt="waze"
                      src="/images1/waze.jpg"
                    ></img>
                  </a>
                  :נווט עם
                </p>
              </Col>
              <Col>
                <h2 className="rtl">שעות פעילות החנות</h2>
                <p>א-ה: 9:00-19:00</p>
                <p>ו: 9:00-14:00</p>
              </Col>
            </Row>
            <hr />
            <Club />
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
