import React, { Component } from "react";
import "./App.css";
import Home from "./Home";
import Products from "./Products";
import Contact from "./Contact";
import Terms from "./Terms";
import HeaderNavBar from "./HeaderNavBar"
import Cart from "./Cart";
import Feed from "./Feed";
import Subscibe from "./Subscibe";
import Schedule from "./Schedule";
import Address from "./Address";
import Footer from "./Footer"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import NavItem from "react-bootstrap/NavItem";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Product from "./Product";
import NotFound from "./NotFound";
import AdminPanel from "./AdminPanel";

class App extends Component {
  
  cat = "";
  state = { data: "", zmanim: "", cartList: [] ,user:null, key:""};
  setSecretKey = key => {
    this.setState({ key: key });
  }
  setUser= (userName) => {
    this.setState({ user: userName });
  }
  addToCart = newItem => {
    newItem.quantity=1;
    let isOnCart = this.state.cartList.find(it =>it._id === newItem._id);
    isOnCart === undefined?
    this.setState(prevState => ({
      cartList: [...prevState.cartList, newItem]
      // cartList: [...this.state.cartList,newItem]
    })):console.log("is on the cart", isOnCart);
    

    // console.log("list cart live " , this.state.cartList);
  };

componentDidMount(){
  window.addEventListener("resize", this.resize.bind(this));
  this.resize();
}

resize() {
  let currentHideNav = (window.innerWidth <= 760);
  if (currentHideNav !== this.state.hideNav) {
      this.setState({hideNav: currentHideNav});
  }
}
addQuantity = item => {
  let tempArry = this.state.cartList;
  tempArry[item].quantity++;
  this.setState({ cartList: tempArry });
}
reduceQuantity = item => {
  let tempArry = this.state.cartList;
  tempArry[item].quantity<=1?console.log(0)
  :
  tempArry[item].quantity--;
  ;
  this.setState({ cartList: tempArry });

}
  deleteFromCart = item => {
    
    let tempArry = this.state.cartList;
   
    tempArry.splice(item, 1)
    console.log(item ,"====item");
    console.log(tempArry,"=======tempArry");
    
   
    this.setState({ cartList: tempArry });
    console.log(this.state.cartList , '------- state');
    
  };
  deletAllCart= () => {
    this.setState({ cartList: [] });

  }
  currentItem = (item,currentImg) => {
    item.currentImg=currentImg;
    this.setState({ currentItem: item });
  };
  getCategories = () => {
    axios
      .get("/categories")
      .then(res => {
        // console.log(res.data.res);
        this.setState({ categories: res.data.res });
        // console.log("categories=",res.data.res);
      })
      .catch(err => console.log(err));
  };
  componentWillMount() {
    this.getCategories();
  }
  render() {
    if (this.state.categories) {
      this.cat = this.state.categories.map((it, index) => (
        <NavItem key={index} value={it.ename}>
          <Link to={"/Products/" + it.ename}>{it.name}</Link>
        </NavItem>
      ));
    }
    return (
      <BrowserRouter>
      <div className="cartbg"></div>
      <HeaderNavBar setSecretKey={this.setSecretKey} setUser={this.setUser} categories={this.state.categories}/>
             <Switch>
          <Route
            exact
            path="/"
            render={() => <Home category={this.state.categories} />}
          />
          <Route exact path="/Products" render={() => <Products cartList={this.state.cartList}/>} />
          <Route
            exact
            path="/Products/:ctgry"
            render={props => (
              <Products
                cartList={this.state.cartList}
                currentItem={this.currentItem}
                addToCart={this.addToCart}
                category={props.match.params.ctgry}
                // {...props}
              />
            )}
          />
          <Route exact path="/Contact" component={Contact} />
          <Route exact path="/Terms" component={Terms} />
          <Route
            exact
            path="/Cart"
            render={() => (
              <Cart
                deletAllCart={this.deletAllCart}
                deleteFromCart={this.deleteFromCart}
                addQuantity={this.addQuantity}
                reduceQuantity={this.reduceQuantity}
                cartList={this.state.cartList}
              />
            )}
          />
          <Route exact path="/Feed" component={Feed} />
          <Route exact path="/Subscibe" component={Subscibe} />
          <Route exact path="/Schedule" component={Schedule} />
          <Route exact path="/Address" component={Address} />
          <Route exact path="/AdminPanel" render={()=><AdminPanel key1={this.state.key} category={this.state.categories}/>}/>
          <Route
            exact
            path="/Product"
            render={() => (
              <Product
                addToCart={this.addToCart}
                currentItem={this.state.currentItem}
              />
            )}
          />
          <Route path="/" component={NotFound} />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
