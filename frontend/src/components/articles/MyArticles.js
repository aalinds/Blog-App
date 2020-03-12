import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import defaultImg from '../../img/default_img.png';

class MyArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  getMyArticles = () => {
    const token = localStorage.getItem('token');
    axios
      .get('http://127.0.0.1:5000/auth/articles', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (!res.data.error) {
          this.setState({
            articles: res.data.articles
          });
        }
      });
  };

  componentDidMount = () => {
    this.getMyArticles();
  };

  deleteHandler = article_id => {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://127.0.0.1:5000/articles/${article_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (!res.data.error) {
          alert(res.data.message);
        }
        this.getMyArticles();
      });
  };

  renderArticles = articles => {
    return articles.map(article => {
      return (
        <div className='card m-1' style={{ width: '25rem' }} key={article.id}>
          <div className='row no-gutters'>
            <img
              src={defaultImg}
              className='card-img col-4'
              alt='...'
              width='100px'
              height='170px'
            />
            <div className='col-8'>
              <div className='card-body'>
                <Link
                  to={`/articles/${article.id}`}
                  className='h6 card-title card-link'
                >
                  {article.title}
                </Link>
                <p
                  className='h6 card-text text-truncate'
                  style={{ height: '50px' }}
                >
                  {article.content}
                </p>
              </div>
              <div className='card-footer'>
                <Link
                  to={`myarticles/${article.id}/edit`}
                  className='btn btn-success'
                >
                  Edit
                </Link>
                <button
                  className='btn btn-danger'
                  onClick={() => {
                    this.deleteHandler(article.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className='container'>
        <div className='row justify-content-around'>
          {this.state.articles.length ? (
            this.renderArticles(this.state.articles)
          ) : (
            <h1>No Articles Found</h1>
          )}
        </div>
      </div>
    );
  }
}

export default MyArticles;
