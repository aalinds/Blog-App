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
          // console.log(typeof res.data.user)
          this.props.getUserDetails(res.data.user);
        }
      });
  };

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
    getUserDetails: user_details => dispatch(getUserDetails(user_details))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
