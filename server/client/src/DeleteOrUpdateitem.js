import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import ProductsListToDelete from "./ProductsListToDelete";

class DeleteOrUpdateitem extends Component {
  state = {};
  productsList = "";
  showItms = () => {
    if (this.state.currentCategory) {
      axios
        .get(`/products/?category=${this.state.currentCategory}`)
        .then((res) => {
          //   console.log(res.data.res.length);
          if (res.data.res.length) {
            this.setState({ products: res.data.res });
          } else {
            this.setState({ products: false });
          }
        })
        .catch((err) => console.log(err));
    }
  };
  findCategory = (category) => {
    if (category) {
      let temp = this.props.category.find((it) => it.name === category);
      this.setState({ currentCategory: temp.ename });
    } else {
      this.setState({ currentCategory: "" });
    }
  };
  render() {
    if (this.state.products) {
      this.productsList = this.state.products.map((it, index) => (
        <ProductsListToDelete showItms={this.showItms} key1={this.props.key1} key={index} tableData={it} />
      ));
    } else {
      this.productsList = "";
    }
    return (
      <div style={{ direction: "rtl", height: "1000px" }}>
        <h1>עדכן או מחק מוצר</h1>
        <h3>שים לב זה בילתי הפיך...</h3>

        <select
          onChange={(evt) => {
            this.findCategory(evt.target.value);
          }}
          id="category"
        >
          <option value="">בחר</option>
          {this.props.category
            ? this.props.category.map((it, index) => (
                <option key={index} value={it.name}>
                  {it.name}
                </option>
              ))
            : ""}
        </select>
        <button onClick={this.showItms}>הצג</button>
        <br />
        <Table><thead><tr><th>שם</th><th>מחיר</th><th>מק"ט</th><th>תיאור</th><th>גודל</th><th>תמונה</th><th>ערוך/מחק</th></tr></thead>{this.productsList}</Table>
        {/* {this.state.products?<h1>{this.state.products[0].name}</h1>:""} */}
      </div>
    );
  }
}

export default DeleteOrUpdateitem;
