import React, { Component } from 'react';
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
class AddProducts extends Component {
    state={}
    findCategory = (category) => {
        if(category){
          let temp = this.props.category.find((it) => it.name === category);
          this.setState({ currentCategory: temp.ename });
        }
        else{
          this.setState({ currentCategory: "" });
        }
      };
    postNewItem = () => {
        if (
          this.state.file  &&
          this.state.itemName  &&
          this.state.currentCategory  &&
          this.state.price  &&
          this.state.description  &&
          this.state.brand 
        ) {
          let formData = new FormData();
          formData.append("theImage", this.state.file);
          formData.append("itemName", this.state.itemName);
          formData.append("currentCategory", this.state.currentCategory);
          formData.append("price", this.state.price);
          formData.append("description", this.state.description);
          formData.append("brand", this.state.brand);
          formData.append("size", this.state.size);
          formData.append("mkt", this.state.mkt);
    
          const config = { headers: { "content-type": "multipart/form-data" } };
    
          axios
            .post("/insertNewItem", formData, config)
            .then((res) => {
              if (res.status === 201) {
                this.setState({ newFileName: res.data.body.itemName });
                // console.log(res.data.file);
              } else {
                console.log(`error status code ${res.status}`);
              }
              this.setState({
                brand: "",
                description: "",
                price: "",
                mkt: "",
                size: "",
                currentCategory: "",
                itemName: "",
                file: "",
              });
            })
            .catch((err) => console.log(err));
        }
      };
    render() {
        return (
            <div>
                <h3>הוספת מוצר</h3>
        {this.state.newFileName ? (
          <div className="continueProcess">
            <h2>מוצר: {this.state.newFileName} נוסף בהצלחה</h2>
            <button
              onClick={() => {
                this.setState({ newFileName: false });
              }}
            >
              המשך להוסיף מוצרים
            </button>
          </div>
        ) : (
          <div
            className="container"
            style={{ direction: "rtl", textAlign: "right" }}
          >
            <Row>
              <Col sm={2}>
                <label htmlFor="category">בחר קטגוריה:</label>
              </Col>
              <Col>
                {" "}
                <select
                  onChange={(evt) => {
                    this.findCategory(evt.target.value);
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
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                {" "}
                <label htmlFor="category">שם המוצר:</label>
              </Col>
              <Col>
                <input
                  type="text"
                  onChange={(evt) =>
                    this.setState({ itemName: evt.target.value })
                  }
                ></input>
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <label htmlFor="category">מחיר המוצר:</label>
              </Col>
              <Col>
                <input
                  onChange={(evt) =>
                    this.setState({ price: Number(evt.target.value) })
                  }
                  type="number"
                ></input>
              </Col>
            </Row>
            {/* new data to item: size, mkt */}
            <Row>
              <Col sm={2}>
                <label htmlFor="category">מקט:</label>
              </Col>
              <Col>
                <input
                  onChange={(evt) => this.setState({ mkt: evt.target.value })}
                  type="text"
                ></input>
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <label htmlFor="category">גודל:</label>
              </Col>
              <Col>
                <input
                  onChange={(evt) => this.setState({ size: evt.target.value })}
                  type="text"
                ></input>
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <label htmlFor="category">תיאור המוצר:</label>
              </Col>
              <Col>
                <input
                  onChange={(evt) =>
                    this.setState({ description: evt.target.value })
                  }
                  type="text"
                ></input>
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <label htmlFor="category">חברה/מותג:</label>
              </Col>
              <Col>
                <input
                  onChange={(evt) => this.setState({ brand: evt.target.value })}
                  type="text"
                ></input>
              </Col>
            </Row>
            <Row>
              <Col sm={2}>
                <label htmlFor="img">תמונה:</label>
              </Col>
              <Col>
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  onChange={(evt) =>
                    this.setState({ file: evt.target.files[0] })
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <button onClick={this.postNewItem}>שלח</button>
              </Col>
            </Row>
          </div>
        )}
            </div>
        );
    }
}

export default AddProducts;