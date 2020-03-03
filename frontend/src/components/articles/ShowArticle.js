import React from 'react';
import axios from 'axios';

class ShowArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: ''
    };
  }

  componentDidMount = () => {
    const article_id = this.props.match.params.article_id;
    axios.get(`http://127.0.0.1:5000/articles/${article_id}`).then(res => {
      if (!res.data.error) {
        this.setState({
          article: res.data.article
        });
      } else {
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
          this.renderArticle(this.state.article)
        ) : (
          <h1>Blog does not exist</h1>
        )}
      </div>
    );
  }
}

export default ShowArticle;
