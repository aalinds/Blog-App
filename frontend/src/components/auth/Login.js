import React, { Component } from 'react';
import axios from 'axios';
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
  };

  formHandler = e => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/auth/login', this.state).then(res => {
      if (!res.data.error) {
        axios
          .get('http://127.0.0.1:5000/auth/details', {
            headers: {
              Authorization: `Bearer ${res.data.token}`
            }
          })
          .then(res => {
            this.props.loginUser(res.data.user);
          });
        localStorage.setItem('token', res.data.token);
      }
      alert(res.data.message);
    });
  };

  render() {
    return (
      <div className='container'>
        <form onSubmit={this.formHandler}>
          <div className='form-group'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>
                  <i className='fas fa-at' />
                </span>
              </div>
              <input
                type='email'
                id='email'
                name='email'
                className='form-control'
                value={this.state.email}
                onChange={this.changeHandler}
                placeholder='Email'
                required
              />
            </div>
          </div>
          <div className='form-group'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>
                  <i className='fas fa-key' />
                </span>
              </div>
              <input
                type='password'
                id='password'
                name='password'
                className='form-control'
                value={this.state.password}
                onChange={this.changeHandler}
                placeholder='Password'
                required
              />
            </div>
          </div>
          <input type='submit' value='Login' className='btn btn-success' />
        </form>
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
