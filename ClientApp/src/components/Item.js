import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Item';

class Item extends Component {
 
  constructor(props) {
    super(props);
    this.props.fetchItem(this.props.match.params.id);
  }

  render() {
    console.log( this.props );

    return (
      <div>
        <h1>Item</h1>
        <p> Name : {this.props.item.name } </p>
        <p> Price : {this.props.item.price } </p>
      </div>
    );
  }
}

export default connect(
  state => state.item,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Item);
