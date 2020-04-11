import React, { Component } from 'react';
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Redirect } from "react-router-dom";

class CategoryList extends Component {
    state={image:"",  redirect: true}
    theCategory= this.props.category? this.props.category:"";
    getImg = () => {
        // console.log(`/img/?category=${this.theCategory.ename}`);
        
        axios
          .get(`/img/?category=${this.theCategory.ename}`)
          .then(res => {
              // console.log(res.data.res[0].imgurl);
              this.setState({image: res.data.res[0].imgurl});
            // console.log(res.data.res);
            // this.setState({ categories: res.data.res });
            // console.log("categories=",res.data.res);
            
          })
          .catch(err => console.log(err));
      };
    componentDidMount(){
        this.getImg();
    }
    render() {
        let direct = this.state.redirect ? (
            ""
          ) : (
            <Redirect to={{
              pathname: `/Products/${this.theCategory.ename}`,
          }}  />
          );
        return (
            <div className="categorylist" style={{ display:"inline-block"}}>
                {direct}
                <Card style={{height:'10rem', width: '10rem' ,margin: "10px"}}  onClick={
              () => {this.setState({ redirect: !this.state.redirect })
              }
            }>
                {this.state.image? <Card.Img height='150rem'  variant="top" src={this.state.image} />:<div style={{margin:"auto"}} className="spinner-border" role="status">
  <span className="sr-only">Loading...</span>
</div>}
  
  <Card.Body>
  {this.theCategory.ename? <Card.Title style={{textAlign: "center"}}>{this.theCategory.ename? this.theCategory.name : "" }</Card.Title>:""}
  </Card.Body>
</Card>
               {/* {this.theCategory.ename} */}
                {/* {this.props.category.map(it => (<p>{it.name}</p>))} */}
            </div>
        );
    }
}

export default CategoryList;