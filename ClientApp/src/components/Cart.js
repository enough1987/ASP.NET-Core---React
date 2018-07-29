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
    this.state = {
          newItem: {
              Name: "",
              Price: 0
          },
    };
    this.props.fetchItems();
  }


    componentWillReceiveProps() {
        this.setState((state, props) => {
            return {
                newItem: {
                    Name: "",
                    Price: 0
                },
            }
        });
    }

  render() {
    console.log(this.props.items);

    return (
      <div>
        <h1> Cart </h1>
          <div>
              <input type="text"
                     name='Name'
                     value={this.state.newItem.Name}
                     onChange={this.handleItemInput} />
              <input type="number"
                     name='Price'
                     value={this.state.newItem.Price}
                     onChange={this.handleItemInput} />
              <input type="button"
                     value="Add"
                     className='add'
                     onClick={() => { this.add() }} />
          </div>
        <div className="cart-items" >
        { this.props.items.map((item) => {

          return (
            <div key={item.Id} className="cart-item" >
                  <p> { item.Name } </p>
                  <p> { item.Price } </p>
                  <Link to={`/item/${item.Id}`}>details</Link>
            </div>
          )
        }) }
        </div>
      </div>
    )
  }


    handleItemInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);
        this.setState({
            newItem: {
                ...this.state.newItem,
                [name]: value
            }
        });
    }

    add = () => {
        this.props.add(this.state.newItem)
            .then((res) => {
                console.log('data is fatched', res);
                if (!res) {
                    return;
                }
                this.props.fetchItems();
            });
    }

}

export default connect(
  state => state.items,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Cart);
