import React, { Component } from 'react';
import axios from "axios";
class ShowImg extends Component {
    state={imgToShow:""}
    

    getImageFromServer = (item) => {
        // console.log(item, "===item");
        
        axios
          .get(`/images/${item}`, { responseType: "blob" })
          .then(res => {
            console.log(res.status,"res.status");
            if (res.status === 304 || res.status === 200 ) {
              const reader = new FileReader();
              reader.readAsDataURL(res.data);
              let _this = this;
              reader.onload = function(){
                  const imageDataUrl = reader.result;
                  _this.setState({imgToShow:imageDataUrl});
                  console.log(reader, "reader--reader");
                  
              }
              // console.log(this.state.imgToShow);
              
            } else {
              console.log(`error status code : ${res.status}`);
            }
          })
          .catch(err => console.log(err));
      };
      componentDidMount(){
        
        if(!this.state.imgToShow){
          this.getImageFromServer(this.props.imgName);
  
        }
      }
      render() {
        console.log(this.props.imgName);

        return (
            <div>
            {/* {this.state.imgToShow?"": this.getImageFromServer(this.props.imgName)} */}
            {this.state.imgToShow?<img style={{height:"20%"}} src={this.state.imgToShow}/> :""}
            </div>
        );
    }
}

export default ShowImg;