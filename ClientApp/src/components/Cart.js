import React, { Component }  from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Cart';
import {
  Link
} from 'react-router-dom';
import './Cart.css';

class Cart extends Component {

  constructor(props) {
    super(props);
    this.props.fetchItems();
  }

  render() {

    return (
      <div>
        <h1> Cart </h1>
        <div className="cart-items" >
        { this.props.items.map((item) => {

          console.log(item);

          return (
            <div key={item.id} className="cart-item" >
              <p> { item.name } </p>
              <p> { item.price } </p>
              <Link to={`/item/${item.id}`}>details</Link>
            </div>

          
          )
        }) }
        </div>
      </div>
    )
  }

}

export default connect(
  state => state.items,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Cart);
