import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class NotFound extends Component {
    state={redirect: true }
  render() {
    const direct = this.state.redirect ? (
        ""
      ) : (
        <Redirect to={{
          pathname: '/',
      }}  />
      );
    return (
      <div style={{ textAlign: "center", color: "red" }} className="container">
            {direct}
        <h1 style={{ marginBottom: "40px" }}>הדף שביקשת לא קיים</h1>
        <button  onClick={
              () => {this.setState({ redirect: !this.state.redirect })
        }
            } className="btn btn-success">חזור</button>

      </div>
    );
  }
}

export default NotFound;
