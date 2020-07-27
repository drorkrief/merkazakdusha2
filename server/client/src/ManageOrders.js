import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

class ManageOrders extends Component {
  render() {
    return (
      <div>
        <Tabs
          style={{ direction: "rtl" }}
          defaultActiveKey="new-orders"
          id="manageOrders-tabs"
        >
          <Tab eventKey="new-orders" title="הזמנות חדשות">
            ManageOrders1
          </Tab>
          <Tab eventKey="closed-orders" title="הזמנות סגורות">
            ManageOrders2
          </Tab>
          <Tab eventKey="in-progress-orders" title="הזמנות בטיפול">
            ManageOrders3
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default ManageOrders;
