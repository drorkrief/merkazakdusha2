import React, { Component } from 'react';
import axios from "axios";

class AddCategory extends Component {
    state={he:'' ,en:''}
    createCategory=(e)=>{
        const config = {
            headers: { Authorization: `Bearer ${this.props.key1}` }
        };
        
        axios
        .post("/addCategory",{he:this.state.he, en:this.state.en}, 
        config)
        .then(res => {
          if (res.status === 201) {
            console.log(res.status);
            this.setState({ result: res.data.he });
            this.props.getCategories()
          } else {
            console.log(`error status code ${res.status}`);
          }
          
        })
        .catch(err => console.log(err));
        e.preventDefault();
        this.setState({ he: "" ,en: ''});

    }
    render() {
        return (
            <div>
        <h4>הוספת קטגוריה</h4>
        {this.state.result?(
          <div className="continueProcess">
            <h2>קטגוריה: {this.state.result} נוספה בהצלחה</h2>
            <button
              onClick={() => {
                this.setState({ result: false });
              }}
            >המשך להוסיף קטגוריות</button>
          </div>
        ):
        <form onSubmit={this.createCategory}>
            <input type="text" value={this.state.he} onChange={e => {this.setState({ he: e.target.value });}} required></input>&nbsp;
             :בעברית 
            <br/><br/>
            <input type="text" value={this.state.en} onChange={e => {this.setState({ en: e.target.value });}} required></input>&nbsp;
             :באנגלית 
            <br/><br/>
            <input type="submit"></input><br/>

        </form>}
            </div>
        );
    }
}

export default AddCategory;