import React, { Component } from 'react';
import axios from "axios";

class DeleteCatByAdmin extends Component {
    state={hebrewName:null, deleteIt : null ,  currentCategory: null}
    deleteCat = (catId) => {
        const headers = { Authorization: `Bearer ${this.props.key1}` };
        axios
        .delete(`/deleteCatByAdmin`, { headers, data: { id: catId } })
        .then((res) => {
          console.log("ok", res);
        })
        .catch(() => {
            console.log("bad");
        });
console.log(catId);
this.setState({ deleteIt : null  });
this.props.getCategories();
    }
    findCategory = (category) => {
        if (category) {
          let temp = this.props.category.find((it) => it.name === category);
          this.setState({ currentCategory: temp.ename, hebrewName: temp.name, id : temp._id});
        } else {
          this.setState({ currentCategory: null });
        }
      };
    render() {
        return (
            <div style={{height:"222px"}}>
        <h4>:בחר קטגוריה למחיקה</h4>
        <select
          style={{ width: "100px", marginRight: "25px" }}
          onChange={(evt) => {
            this.findCategory(evt.target.value);
            this.setState({ deleteIt: false });
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
        <button onClick={() => this.setState({ deleteIt: true })}>מחק</button>
            <br/>{this.state.deleteIt&& this.state.currentCategory &&<p>?האם אתה רוצה למחוק את {this.state.hebrewName}</p>}
            {this.state.deleteIt&& this.state.currentCategory &&<button onClick={() =>this.deleteCat(this.state.id)}>כן מחק את {this.state.hebrewName}</button>}
            </div>
        );
    }
}

export default DeleteCatByAdmin;