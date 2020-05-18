import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import CheckOut from "./CheckOut";
import { MdAddCircle, MdDelete } from "react-icons/md";
import { FaMinusCircle } from "react-icons/fa";
import ShowImg from "./ShowImg";

class Cart extends Component {
  state = { cartList: this.props.cartList, total: 0 };
  list = this.state.cartList;
  deletAllCartList= () => {
    this.setState({ cartList: [] });

  }
  render() {
    // console.log(this.props.cartList.length !== 0 , "status");

    return (
      <div >
        
        <h1>עגלת קניות</h1>
        <Table responsive>
          <thead>
            <tr>
              <th>הסר</th>
              <th>מחיר סופי</th>
              <th>כמות</th>
              <th>מחיר מוצר</th>
              <th>מוצר</th>
              <th>תמונה</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cartList.map((it, index) => (
              <tr key={index}>
                <td>
                  <button
                    style={{ border: "none", backgroundColor: "inherit" }}
                    onClick={() => {
                      this.props.deleteFromCart(index);
                    }}
                  >
                    <MdDelete />
                  </button>
                </td>
                <td>{(it.price * it.quantity).toFixed(2)}</td>
                <td>
                  <button
                    style={{ border: "none", backgroundColor: "inherit" }}
                    onClick={() => {
                      this.props.reduceQuantity(index);
                    }}
                  >
                    <FaMinusCircle size="13px" color="red" />
                  </button>
                  {it.quantity}
                  <button
                    style={{ border: "none", backgroundColor: "inherit" }}
                    onClick={() => {
                      this.props.addQuantity(index);
                    }}
                  >
                    <MdAddCircle color="green" />
                  </button>
                </td>
                <td>{(it.price).toFixed(2)}</td>
                <td>{it.name}</td>
                <td>
                <ShowImg imgName={it.imgurl} />
                </td>
              </tr>
            ))}

            {/* {this.state.cartList.map((it, index)=>
        <Cartitem key={index} index={index} it={it} deleteFromCart={this.props.deleteFromCart}/>
        )} */}
          </tbody>
          {/* {this.state.cartList.map(it => <p>{it.name} --- {it.price}</p>)} */}
        </Table>
        {this.props.cartList.length !== 0 ? (
          <CheckOut deletAllCartList={this.deletAllCartList} deletAllCart={this.props.deletAllCart} cartList={this.state.cartList} />
        ) : (
          <p>עבור לקטגוריות כדי למלא את העגלה </p>
        )}
      </div>
    );
  }
}

export default Cart;
