import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  formHandler = e => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/auth/register', this.state).then(res => {
      alert(res.data.message);
      if (!res.data.error) {
        this.props.history.push('/login');
      }
    });
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <form onSubmit={this.formHandler}>
        <input
          type='email'
          placeholder='email'
          name='email'
          onChange={this.changeHandler}
          required
        />
        <input
          type='password'
          placeholder='password'
          name='password'
          onChange={this.changeHandler}
          required
        />
        <input type='submit' />
      </form>
    );
  }
}

export default Register;
