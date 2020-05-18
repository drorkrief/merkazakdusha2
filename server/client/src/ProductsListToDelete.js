import React, { Component } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { MdCloudUpload } from "react-icons/md";
import ShowImg from "./ShowImg";
import axios from "axios";

class ProductsListToDelete extends Component {
  state = {
    itemToEdit: "",
    name: this.props.tableData.name,
    price: this.props.tableData.price,
    mkt: this.props.tableData.mkt,
    description: this.props.tableData.description,
    size: this.props.tableData.size,
  };
  editItem = (it) => {
    this.setState({ itemToEdit: it });
    console.log(it);
  };
  deleteItem = (it) => {
    const headers = { Authorization: `Bearer ${this.props.key1}` };
    axios
      .delete(`/deleteItemByAdmin`, { headers, data: { id: it } })
      .then((res) => {
        // console.log(res);
        if(res.status === 201){

            this.props.showItms();
        }else{
            alert(`הכנס שם וסיסמה כדי למחוק מוצר${res.status}`);
        }
      })
      .catch(() => {
        
        
      });
  };
  render() {
    return (
      <tbody>
        {this.state.itemToEdit ? (
          <tr>
            <td>
              <input
                style={{ width: "6vw" }}
                type="text"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              ></input>
            </td>
            <td>
              <input
                style={{ width: "6vw" }}
                type="text"
                value={this.state.price}
                onChange={(e) => this.setState({ price: e.target.value })}
              ></input>
            </td>
            <td>
              <input
                style={{ width: "6vw" }}
                type="text"
                value={this.state.mkt}
                onChange={(e) => this.setState({ mkt: e.target.value })}
              ></input>
            </td>
            <td>
              <input
                style={{ width: "6vw" }}
                type="text"
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              ></input>
            </td>
            <td>
              <input
                style={{ width: "6vw" }}
                type="text"
                value={this.state.size}
                onChange={(e) => this.setState({ size: e.target.value })}
              ></input>
            </td>
            <td>
              <ShowImg imgName={this.props.tableData.imgurl} />
            </td>
            <td>
              <button
                style={{ background: "none", border: "none", fontSize: "15px" }}
              >
                <MdCloudUpload />
              </button>
            </td>
          </tr>
        ) : (
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
              <button
                onClick={() => this.editItem(this.props.tableData._id)}
                style={{ background: "none", border: "none" }}
              >
                <FaEdit />
              </button>
              /
              <button
                onClick={() => this.deleteItem(this.props.tableData._id)}
                style={{ background: "none", border: "none" }}
              >
                <AiFillDelete />
              </button>
            </td>
          </tr>
        )}
      </tbody>
    );
  }
}

export default ProductsListToDelete;
