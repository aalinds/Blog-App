import React from 'react';
import axios from 'axios';
import Comments from './Comments';
import CommentForm from './CommentForm';

class ShowArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: '',
      comments: []
    };
  }

  getArticle = () => {
    const article_id = this.props.match.params.article_id;
    const token = localStorage.getItem('token');
    axios
      .get(`http://127.0.0.1:5000/articles/${article_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (!res.data.error) {
          this.setState({
            article: res.data.article
          });
        } else {
        }
      });
  };

  getArticleComments = () => {
    const article_id = this.props.match.params.article_id;
    axios
      .get(`http://127.0.0.1:5000/articles/${article_id}/comments`)
      .then(res => {
        if (!res.data.error) {
          this.setState({
            comments: res.data.comments
          });
        }
      });
  };

  componentDidMount = () => {
    this.getArticle();
    this.getArticleComments();
  };

  commentFormHandler = comment_data => {
    const token = localStorage.getItem('token');
    axios
      .post(
        `http://127.0.0.1:5000/articles/${this.props.match.params.article_id}/comments`,
        {
          data: comment_data
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        if (!res.data.error) {
          alert('Comment Added');
          this.getArticleComments();
        } else {
          alert(res.data.message);
        }
      });
  };

  commentDeleteHandler = comment_id => {
    const token = localStorage.getItem('token');
    axios
      .delete(
        `http://127.0.0.1:5000/articles/${this.props.match.params.article_id}/comments/${comment_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        if (!res.data.error) {
          alert('Comment Deleted');
          this.getArticleComments();
        } else {
          alert(res.data.message);
        }
      });
  };

  renderArticle = article => {
    return (
      <div>
        <div className='h1 text-center'>{article.title}</div>
        <div className='text-center h5'>@{article.username}</div>
        <div className='text-center'>{article.content}</div>
      </div>
    );
  };

  render() {
    return (
      <div className='container'>
        {this.state.article ? (
          <React.Fragment>
            {this.renderArticle(this.state.article)}
            <hr />
            <h3 className='text-center'>Comments</h3>
            <CommentForm commentFormHandler={this.commentFormHandler} />
            <Comments
              commentDeleteHandler={this.commentDeleteHandler}
              comments={this.state.comments}
            />
          </React.Fragment>
        ) : (
          <h1>Blog does not exist</h1>
        )}
      </div>
    );
  }
}

export default ShowArticle;
