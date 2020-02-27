import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    e.preventDefault();
  };

  clickHandler = () => {
    axios.post('http://127.0.0.1:5000/auth/login', this.state).then(res => {
      if (!res.data.error) {
        localStorage.setItem('token', res.data.token);
        this.props.loginUser(this.state.email);
      } else {
        console.log(res.data.message);
      }
    });
  };

  render() {
    return (
      <div className='container'>
        {/* {this.props.logged_user ? <Redirect to="/dashboard" /> : null} */}
        <div className='row flex-column col-3 mx-auto'>
          <input
            type='email'
            placeholder='Email'
            value={this.state.email}
            name='email'
            onChange={this.changeHandler}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={this.state.password}
            onChange={this.changeHandler}
          />
          <button className='btn btn-success' onClick={this.clickHandler}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(loginUser(user))
  };
};

export default connect(null, mapDispatchToProps)(Login);
