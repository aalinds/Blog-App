import React from 'react';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
  }

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
