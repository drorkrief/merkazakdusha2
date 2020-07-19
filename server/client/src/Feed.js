import React, { Component } from 'react';
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";

class Feed extends Component {
    state={ data: ""}
    getfeeds = () => {

    }
    componentWillMount(){
        this.getfeeds();
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
    render() {
        return (
            <div className="container" style={{marginTop:"30px"}}>
    
          {this.state.data? this.state.data.map((it,index)=>(
          <Jumbotron className="textFeed" key={index}>
          <h1>{it.title}</h1>
          <p>
           {it.text}
          </p><hr/>
          <p>תאריך: {it.date}</p>
        </Jumbotron>
          )):""} 
            </div>
        );
    }
}

export default Feed;