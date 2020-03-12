import React from 'react';
// import axios from 'axios';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
      //   article_id: this.props.article_id
    };
  }

  //   commentFormHandler = e => {
  //     e.preventDefault();
  //     const token = localStorage.getItem('token');
  //     axios
  //       .post(
  //         `http://127.0.0.1:5000/articles/${this.props.article_id}/comments`,
  //         {
  //           data: this.state.data
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`
  //           }
  //         }
  //       )
  //       .then(res => {
  //         if (!res.data.error) {
  //           alert('Comment Added');
  //           this.setState({
  //             data: ''
  //           });
  //         }
  //       });
  //   };

  commentFormHandler = e => {
    e.preventDefault();
    this.props.commentFormHandler(this.state.data);
    this.setState({
      data: ''
    });
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <form onSubmit={this.commentFormHandler}>
        <div className='form-group'>
          <textarea
            type='text'
            className='form-control'
            name='data'
            onChange={this.changeHandler}
            value={this.state.data}
            required
          />
        </div>
        <input type='submit' value='add comment' className='btn btn-success' />
      </form>
    );
  }
}

export default CommentForm;
