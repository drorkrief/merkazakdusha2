import React from "react";

let style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    // padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "15px",
    width: "100%",
    fontSize: "10px",
    direction: "rtl"
  };

function Footer() {
    return (
      <div style={style}>
        <span>© 2020 </span>
        <span>כל הזכויות שמורות למרכז הקדושה. </span>
        <span>
          
          נבנה על ידי <a href="mailto:dror1krief@gmail.com">Dror Krief</a> בניית
          אתרים.
        </span>
      </div>
    );
  }
  export default Footer;