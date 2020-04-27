import React, { Component } from 'react';
import axios from "axios";
class ShowImg extends Component {
    state={img:""}
    getImageFromServer = (item) => {
        console.log(item, "===item");
        
        axios
          .get(`/images/${item}`, { responseType: "blob" })
          .then(res => {
            if (res.status === 200) {
              const reader = new FileReader();
              reader.readAsDataURL(res.data);
              const _this = this;
              reader.onload = function(){
                  const imageDataUrl = reader.result;
                  _this.setState({img:imageDataUrl});
              }
    
            } else {
              console.log(`error status code : ${res.status}`);
            }
          })
          .catch(err => console.log(err));
      };
    render() {
        console.log(this.props.imgName);

        return (
            <div>
            {this.state.img?"": this.getImageFromServer(this.props.imgName)}
            {this.state.img?<img style={{height:"20%"}} src={this.state.img}/> :""}
            </div>
        );
    }
}

export default ShowImg;