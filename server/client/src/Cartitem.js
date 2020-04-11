import React, { Component } from 'react';
import { MdDelete } from "react-icons/md";

import { MdAddCircle , MdDelete } from "react-icons/md";
import {FaMinusCircle} from "react-icons/fa";
class Cartitem extends Component {
  state={item:this.props.it}
    item = this.props.it;
    render() {
        return (
            

          <tr >
            <td>
            <button style={{border:'none' , backgroundColor: "inherit" }} onClick={() =>{ 
             this.props.deleteFromCart(this.props.index)}}><MdDelete/></button>
            </td>
            <td>
            {this.state.item.price}
            </td>
            <td>
            <FaMinusCircle size="13px" color="red"/>{this.state.item.quantity}<MdAddCircle color="green"/>
            </td>
            <td>
            {this.state.item.price}

            </td>
            <td>
            {this.state.item.name}
            </td>
            <td>
              <img style={{height:"35px"}} alt={this.state.item.name} src={"." + this.state.item.imgurl}></img>
            </td>
          </tr>

            
          
        );
    }
}

export default Cartitem;