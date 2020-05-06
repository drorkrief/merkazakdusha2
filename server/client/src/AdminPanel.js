import React, { Component } from "react";

import AddCategory from "./AddCategory";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AddProducts from "./AddProducts";
import DeleteOrUpdateitem from "./DeleteOrUpdateitem";
class AdminPanel extends Component {
  state = { file: "", itemName: "", currentCategory: "" };

 
 
  render() {
    // console.log(this.props.key1,"this.props.key1this.props.key1");
    
    return (
      <div style={{ textAlign: "center" }}>
        <h1>ניהול האתר</h1>
        <Tabs style={{direction:"rtl"}}
          defaultActiveKey="home"
          transition={false}
          id="noanim-tab-example"
        >
          <Tab eventKey="home" title="ניהול מוצרים">
          <AddProducts category={this.props.category}/>
          <div className="container"><hr/></div>
          <DeleteOrUpdateitem key1={this.props.key1} category={this.props.category}/>
          </Tab>
          <Tab eventKey="profile" title="ניהול קטגוריות">
        <AddCategory key1={this.props.key1} getCategories={this.props.getCategories}/>
          </Tab>
          <Tab eventKey="contact" title="ניהול הזמנות">
            <h3>...בקרוב</h3>
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
