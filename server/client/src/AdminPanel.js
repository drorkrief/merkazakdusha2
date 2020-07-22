import React, { Component } from "react";
import RenameCategoryByAdmin from "./RenameCategoryByAdmin";
import AddCategory from "./AddCategory";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddProducts from "./AddProducts";
import DeleteOrUpdateitem from "./DeleteOrUpdateitem";
import DeleteCatByAdmin from "./DeleteCatByAdmin";
import ManageOrders from "./ManageOrders"
class AdminPanel extends Component {
  state = { file: "", itemName: "", currentCategory: "" };

  render() {
    // console.log(this.props.key1,"this.props.key1this.props.key1");

    return (
      <div style={{ textAlign: "center" }}>
        <h1>ניהול האתר</h1>
        <Tabs
          style={{ direction: "rtl" }}
          defaultActiveKey="home"
          transition={false}
          id="noanim-tab-example"
        >
          <Tab eventKey="home" title="ניהול מוצרים">
            <AddProducts category={this.props.category} />
            <div className="container">
              <hr />
            </div>
            <DeleteOrUpdateitem
              key1={this.props.key1}
              category={this.props.category}
            />
          </Tab>
          <Tab eventKey="profile" title="ניהול קטגוריות">
           <Row>
             <Col> 
             <RenameCategoryByAdmin
               key1={this.props.key1}
               category={this.props.category}
               getCategories={this.props.getCategories}
             />
             </Col>
             <Col>
                     <div style={{borderLeft:"1.5px solid rgba(0,0,0,.1)"}}>
            <AddCategory
              key1={this.props.key1}
              getCategories={this.props.getCategories}
            />
             </div>
             </Col>
           </Row>
           
            <div className="container">
              <hr />
            </div>
            <h4>מחיקת קטגוריה</h4>
            <h5 style={{color:"red"}}>!!!שים לב! כל המוצרים שתחת הקטגוריה שתמחק <b>לא</b>  יוצגו יותר באתר</h5>
            <DeleteCatByAdmin 
                key1={this.props.key1}
               category={this.props.category}
               getCategories={this.props.getCategories}/>
          </Tab>
          <Tab eventKey="contact" title="ניהול הזמנות">
            <h3>הזמנות</h3>
            <ManageOrders/>
          </Tab>
          <Tab eventKey="feed" title="ניהול פוסטים">
            <h3>...בקרוב</h3>

          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default AdminPanel;
