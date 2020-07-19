import React, { Component } from "react";
import axios from "axios";

class RenameCategoryByAdmin extends Component {
  state = { currentCategory: null, edit: null };
  findCategory = (category) => {
    if (category) {
      let temp = this.props.category.find((it) => it.name === category);
      this.setState({ currentCategory: temp.ename, hebrewName: temp.name , id : temp._id});
    } else {
      this.setState({ currentCategory: "" });
    }
  };
  updateCategoryNameByAdmin = () => {
    let _this = this;
    const config = {
      headers: { Authorization: `Bearer ${this.props.key1}` },
    };
    axios
      .post(
        "/uploadCatChanges",
        {
          id: this.state.id,
          name: this.state.hebrewName,
        },
        config
      )
      .then(function (response) {
        // _this.setState({ itemToEdit: false });
        // _this.props.showItms();
        _this.setState({ edit: false })
        _this.props.getCategories();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(this.state.hebrewName);
  };
  render() {
    return (
      <div>
        <h5>:בחר קטגוריה לשינוי</h5>

        <select
          style={{ width: "100px", marginRight: "25px" }}
          onChange={(evt) => {
            this.findCategory(evt.target.value);
            this.setState({ edit: false });
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
        <button onClick={() => this.setState({ edit: true })}>הצג</button>
        <br />
        {this.state.edit && this.state.currentCategory && (
          <input
            style={{ marginTop: "20px" }}
            value={this.state.hebrewName}
            onChange={(e) => this.setState({ hebrewName: e.target.value })}
          ></input>
        )}
        <br />
        <br />
        {this.state.edit && this.state.currentCategory && (
          <button onClick={this.updateCategoryNameByAdmin}>
            עדכן את שם הקטגוריה
          </button>
        )}
      </div>
    );
  }
}

export default RenameCategoryByAdmin;
