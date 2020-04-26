import React, { Component } from 'react';
import axios from "axios";
let bbbb;
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
                  bbbb =imageDataUrl;
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
            {bbbb?<img style={{height:"10%"}} src={bbbb}/> :""}
            </div>
        );
    }
}

export default ShowImg;