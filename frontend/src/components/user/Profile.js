import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserDetails } from '../redux/actions';

class Profile extends Component {
  componentDidMount = () => {
    const token = localStorage.getItem('token');
    axios
      .get('http://127.0.0.1:5000/auth/details', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (!res.data.error) {
          this.props.getUserDetails(res.data.email);
        }
      });
  };

  render() {
    return <div>{this.props.user_details}</div>;
  }
}

const mapStateToProps = state => {
  return {
    user_details: state.user_details
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: user_details => dispatch(getUserDetails(user_details))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
