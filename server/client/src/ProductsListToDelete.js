import React, { Component } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import ShowImg from "./ShowImg";
import axios from "axios";

class ProductsListToDelete extends Component {
    state={}
    deleteItem = (it) => {
        const headers = { Authorization: `Bearer ${this.props.key1}` };
        axios
          .delete(`/deleteItemByAdmin`, { headers, data: { id: it } })
          .then((res) => {
            // console.log(res);
            this.showItms();
          })
          .catch(() => {
            alert("הכנס שם וסיסמה כדי למחוק מוצר");
          });
      };
  render() {
    return (
      
        <tr>
          <td>{this.props.tableData.name}</td>
          <td>{this.props.tableData.price}</td>
          <td>{this.props.tableData.mkt}</td>
          <td>{this.props.tableData.description}</td>
          <td>{this.props.tableData.size}</td>
          <td>
            <ShowImg imgName={this.props.tableData.imgurl} />
          </td>
          <td>
            <FaEdit />/
            <button
              onClick={() => this.deleteItem(this.props.tableData._id)}
              style={{ background: "none", border: "none" }}
            >
              <AiFillDelete />
            </button>
          </td>
        </tr>
      
    );
  }
}

export default ProductsListToDelete;
