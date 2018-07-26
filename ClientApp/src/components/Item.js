import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Item';
import {withRouter} from "react-router-dom";

class Item extends Component {
 
  constructor(props) {
    super(props);
    this.props.fetchItem(this.props.match.params.id);
    this.state = {
        newItem: {
            Name: "",
            Price: 1000
        },
        isEdit: false
    };
  }

  componentWillReceiveProps() {
      this.setState((state, props) => {
          if ( !props.item || !props.item.Name || !props.item.Price ) {
            return state;
          }
          return {
              newItem: { ...props.item },
              isEdit: false
          }
      });
  }

  render() {
    console.log( this.props, " - " , this.state );

    return (
      <div>
        <h1>Item</h1>

        <div style={this.state.isEdit ? { display: 'none' } : {} } >
              <p> Name : {this.props.item.Name } </p>
              <p> Price : {this.props.item.Price } </p>
        </div>

        <div style={this.state.isEdit ? {} : { display: 'none' }} >
            <input type="text"
                   name='Name'
                   value={this.state.newItem.Name}
                   onChange={this.handleItemInput} />
            <input type="number"
                   name='Price'
                   value={this.state.newItem.Price}
                   onChange={this.handleItemInput} />
        </div>

        <input type="button"
               value={ !this.state.isEdit ? "Edit" : "Update" }
               className='update'
               onClick={() => { !this.state.isEdit ? this.edit() : this.update() }} />
        <input type="button"
               value="Delete"
               className='delete'
               onClick={ this.delete } />
      </div>
    );
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

  edit = () => {
      this.setState({
          isEdit: true
      });
  }

  update = () => {
      this.props.update(this.state.newItem)
          .then((res) => {
              if (!res) {
                  return;
              }
              this.props.fetchItem(this.state.newItem.Id);
          });
  }

  delete = () => {
        this.props.delete(this.props.item.Id)
            .then((res) => {
                if (!res) {
                    return;
                }
                this.props.history.push("/cart");
            });
  }

}

export default connect(
  state => state.item,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(withRouter(Item));
