import React, { Component } from 'react';
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
class PassNewItem extends Component {
    state = {
        name: "",
        desc: "",
        img: "",
        passPic:"",
        gitAddress: "",
        redirectToGraduates: false,
        errorDesc: ""
      };
     
      nameChange = e => {
        this.setState({ name: e.target.value });
      };
      descChange = e => {
        this.setState({ desc: e.target.value });
      };
      imgChange = e => {
        let idCardBase64 = "";
    
        this.getBase64(e.target.files[0], result => {
          idCardBase64 = result;
          this.setState({ img: idCardBase64 });
          
        });
      };
      passPicChange = e => {
        let idCardBase64 = "";
    
        this.getBase64(e.target.files[0], result => {
          idCardBase64 = result;
          this.setState({ passPic: idCardBase64 });
          
        });
      };
      gitAddressChange = e => {
        this.setState({ gitAddress: e.target.value });
      };
    
      getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
          cb(reader.result);
        };
        reader.onerror = function(error) {
          console.log("Error: ", error);
        };
      }
      sendItem = () => {
        this.setState({ errorDesc: "" });
    
        const formData = new FormData();
        formData.append("img", this.state.img);
        formData.append("name", this.state.name);
        formData.append("desc", this.state.desc);
        formData.append("gitAddress", this.state.gitAddress);
        formData.append("email", this.props.token);
        formData.append("passPic", this.state.passPic);
        axios
          .post(
            "/createNewItem/insert",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
          .then(res => {
            if (res.status === 201) {
              this.setState({ redirectToGraduates: true });
            } else {
              this.setState({ errorDesc: "error" });
            }
          })
          .catch(err => {
            if (err.response.status === 413) {
              this.setState({
                errorDesc: "Image is too large.Please choose another image"
              });
            } else if (err.response.status === 401) {
              this.setState({
                errorDesc: "You are not autorised to do this action"
              })}else {
              this.setState({ errorDesc: "error" });
            }
          });
      };
      render() {
        if (this.state.redirectToGraduates) {
          return <Redirect to="/graduates"></Redirect>;
        }
        const disabled = !this.state.name || !this.state.desc || !this.state.img ;
        return (
          <div className="pageTemplate backTemp">
           
                <input
                  type="text"
                  className="form-control"
                  placeholder="Insert Your Name"
                  onChange={this.nameChange}
                />
    
                <input
                  type="textarea"
                  className="form-control"
                  placeholder="Describe your project"
                  onChange={this.descChange}
                />

                
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  // name="graduateImg"
                  ref="fileUploader"
                  onChange={this.imgChange}
               />

                
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  name="passPic"
                  ref="fileUploader"
                  onChange={this.passPicChange}
               />
              
             
                
    
                <input
                  type="text"
                  className="form-control"
                  placeholder="Insert Link toYour Git"
                  onChange={this.gitAddressChange}
                />

               
                <Button
                  className="form-control"
                  variant="primary"
                   disabled={disabled} 
                  onClick={this.sendItem}
                >
                  Save
                </Button>
              </div>
           
        );
      }
}

export default PassNewItem;