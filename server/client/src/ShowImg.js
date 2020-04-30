import React, { Component } from "react";
import axios from "axios";
class ShowImg extends Component {
  state = { imgToShow: "" };

  getImageFromServer = (item) => {
    axios
      .get(`/images/${item}`, { responseType: "blob" })
      .then((res) => {
        console.log(res.status, "res.status");
        if (res.status === 304 || res.status === 200) {
          const reader = new FileReader();
          reader.readAsDataURL(res.data);
          let _this = this;
          reader.onload = function () {
            const imageDataUrl = reader.result;
            _this.setState({ imgToShow: imageDataUrl });
            console.log(reader, "reader--reader");
          };
        } else {
          console.log(`error status code : ${res.status}`);
        }
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    if (!this.state.imgToShow) {
      this.getImageFromServer(this.props.imgName);
    }
  }
  render() {
    console.log(this.props.imgName);

    return (
      <div>
        {/* {this.state.imgToShow?"": this.getImageFromServer(this.props.imgName)} */}
        {this.state.imgToShow ? (
          <img style={{ width: "100%" }} src={this.state.imgToShow} />
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
