import React, { Component } from 'react';
import axios from 'axios';

class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      category_id: 1
    };
  }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  formSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post('http://127.0.0.1:5000/articles', {
      article: this.state,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.formSubmit}>
          <input
            onChange={this.changeHandler}
            type='text'
            placeholder='Title'
            value={this.state.title}
            name='title'
            required
          />
          <textarea
            onChange={this.changeHandler}
            placeholder='Content'
            value={this.state.content}
            name='content'
            required
          />
          <input type='submit' value='Add Article' />
        </form>
      </div>
    );
  }
}

export default AddArticle;
