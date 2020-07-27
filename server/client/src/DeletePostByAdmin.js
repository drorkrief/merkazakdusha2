import React, { Component } from 'react';
import axios from "axios";

class DeletePostByAdmin extends Component {
    state={ data: ""}
    getFeed = () => {

        
        axios.get('/feed')
        .then(response=> {
        // handle success
        this.setState({ data: response.data.res });
        //  console.log(response.data.res);
         
        
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }
    componentWillMount() {
        this.getFeed()
    }
    findCategory = (category) => {
        if (category) {
          let temp = this.state.data.find((it) => it.title === category);
          this.setState({ currentCategory: temp.title, id : temp._id});
        } else {
          this.setState({ currentCategory: null });
        }
      };
      deletePost = (idNum) => {
        const headers = { Authorization: `Bearer ${this.props.key1}` };
        axios
        .delete(`/deletePostByAdmin`, { headers, data: { id: idNum } })
        .then((res) => {
          console.log("ok", res);
          this.getFeed()
            this.setState({ deleteIt: false });
        })
        .catch(() => {
            console.log("bad");
        });
console.log(idNum);
      }
    render() {
        return (
            <div>
                <h4>:בחר פוסט למחיקה</h4>
        <select
        //   style={{ width: "100px", marginRight: "25px" }}
          onChange={(evt) => {
            this.findCategory(evt.target.value);
            this.setState({ deleteIt: false });
          }}
          id="category"
        >
          <option value="">בחר</option>
          {this.state.data
            ? this.state.data.map((it, index) => (
                <option key={index} value={it.title}>
                  {it.title}
                </option>
              ))
            : ""}
        </select>
        <button onClick={() => this.setState({ deleteIt: true })}>מחק</button>
            <br/>{this.state.deleteIt&& this.state.currentCategory &&<div><p>?האם אתה רוצה למחוק את {this.state.currentCategory}</p><button onClick={() =>this.deletePost(this.state.id)}>כן מחק את {this.state.currentCategory}</button></div>}
       
            </div>
        );
    }
}

export default DeletePostByAdmin;