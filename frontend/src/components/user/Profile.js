import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { getUserDetails } from '../redux/actions';

class Profile extends Component {
  render() {
    return this.props.user_details ? (
      <div className='container'>
        <h1>{this.props.user_details.email}</h1>
        <h1>{this.props.user_details.name}</h1>
      </div>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    user_details: state.user_details
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: () => dispatch(getUserDetails())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
