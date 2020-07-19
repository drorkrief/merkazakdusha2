import React, { Component } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete , AiOutlineRollback } from "react-icons/ai";
import { MdCloudUpload } from "react-icons/md";
import ShowImg from "./ShowImg";
import axios from "axios";

class ProductsListToDelete extends Component {
  state = {
    updated : false,
    itemToEdit: "",
    name: this.props.tableData.name,
    price: this.props.tableData.price,
    mkt: this.props.tableData.mkt,
    description: this.props.tableData.description,
    size: this.props.tableData.size,
  };
  
  editItem = (it) => {
    this.setState({ itemToEdit: it });
    // console.log(it);
  };
  uploadChanges = () => {
    let _this = this;
    const config = {
      headers: { Authorization: `Bearer ${this.props.key1}` }
  };
    axios.post('/uploadChanges', {
      id: this.props.tableData._id,
      name:this.state.name,
      price:this.state.price,
      mkt:this.state.mkt,
      description:this.state.description,
      size:this.state.size
    }, config)
    .then(function (response) {
      _this.setState({ itemToEdit: false });
      _this.props.showItms();

      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  deleteItem = (it) => {
    const headers = { Authorization: `Bearer ${this.props.key1}` };
    axios
      .delete(`/deleteItemByAdmin`, { headers, data: { id: it } })
      .then((res) => {
        // console.log(res);
        if(res.status === 201){

            this.props.showItms();
        }
      })
      .catch(() => {
        alert(`הכנס שם וסיסמה כדי למחוק מוצר`);   
      });
  };
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.tableData._id !== prevProps.tableData._id) {
      this.setState({ itemToEdit : "" ,
      name: this.props.tableData.name ,
      price: this.props.tableData.price,
      mkt: this.props.tableData.mkt,
      description: this.props.tableData.description,
      size: this.props.tableData.size})
      // this.state.itemToEdit? this.setState({ itemToEdit : this.props.tableData._id }):"";
    }
  }
  render() {
    return (
      <tbody>
        {this.state.itemToEdit ===  this.props.tableData._id? (
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
                title={"עדכן"}
                style={{ background: "none", border: "none", fontSize: "15px" }}
                onClick={this.uploadChanges}
              >
                <MdCloudUpload />
              </button>
              /
              <button
                title={"בטל עדכון"}
                onClick={() => this.setState({ itemToEdit : "" })}
                style={{ background: "none", border: "none" }}
              >
                <AiOutlineRollback />
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
                title={"עריכה"}
                onClick={() => this.editItem(this.props.tableData._id)}
                style={{ background: "none", border: "none" }}
              >
                <FaEdit />
              </button>
              /
              <button
                title={"מחיקת מוצר"}
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
