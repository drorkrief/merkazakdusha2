import React, { Component } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';



class Schedule extends Component {
  render() {
    return (
      <div >
        
        {/* <h1>שעות פעילות החנות</h1> */}
        <div style={{paddingTop:"20px"}} className="container">
  <div className="jumbotron">
    <h1 className="rtl">שעות פעילות החנות</h1>      
    <p>א-ה: 9:00-19:00</p>
    <p>ו: 9:00-14:00</p>
  </div>
        
</div>
      </div>
    );
  }
}

export default Schedule;
