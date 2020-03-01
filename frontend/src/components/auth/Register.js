import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
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
      <div className='container'>
        <form onSubmit={this.formHandler}>
          <div className='form-group'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>
                  <i className='fas fa-user' />
                </span>
              </div>
              <input
                type='text'
                name='name'
                onChange={this.changeHandler}
                className='form-control'
                placeholder='Name'
                required
              />
            </div>
          </div>
          <div className='form-group'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>
                  <i className='fas fa-at' />
                </span>
              </div>
              <input
                type='email'
                name='email'
                id='email'
                onChange={this.changeHandler}
                required
                className='form-control'
                placeholder='Email'
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
                name='password'
                onChange={this.changeHandler}
                required
                className='form-control'
                placeholder='Password'
              />
            </div>
          </div>
          <input type='submit' value='Register' className='btn btn-success' />
        </form>
      </div>
    );
  }
}

export default Register;
