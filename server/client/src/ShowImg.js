import React, { Component } from "react";
import axios from "axios";
class ShowImg extends Component {
  state = { imgToShow: "" ,imgName: "" };

  getImageFromServer = (item) => {
    axios
      .get(`/images/${item}`, { responseType: "blob" })
      .then((res) => {
        // console.log(res.status, "res.status");
        if (res.status === 304 || res.status === 200) {
          const reader = new FileReader();
          reader.readAsDataURL(res.data);
          let _this = this;
          reader.onload = function () {
            const imageDataUrl = reader.result;
            _this.setState({ imgToShow: imageDataUrl });
            // console.log(reader, "reader--reader");
          };
        } else {
          console.log(`error status code : ${res.status}`);
        }
      })
      .catch((err) => console.log(err));
      this.setState({ imgName: item });
  };
  componentDidMount() {
    // if (!this.state.imgToShow ) {
      this.setState({ imgToShow: "" });
      this.getImageFromServer(this.props.imgName);
      // this.setState({ firstTime: true });
    // }
   
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ imgToShow: "" , imgName:nextProps.imgName});
      this.getImageFromServer(nextProps.imgName);
   
  }
  render() {
    // console.log(this.props.imgName);

    return (
      <div style={{width: "100%", height:"100%",overflow:"hidden"}}>
        {/* {this.state.imgToShow?"": this.getImageFromServer(this.props.imgName)} */}
        {this.state.imgToShow ? (
          <img alt={this.props.imgName} style={{ width: "100%", height:"100%",objectFit:"cover" }} src={this.state.imgToShow} />
        ) : (
          <div
              style={{ position: "absolute" , left: "45%" , top: "30%"}}
              className="spinner-border"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          
        )}
      </div>
    );
  }
}

export default ShowImg;
