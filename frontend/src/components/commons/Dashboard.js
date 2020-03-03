import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import defaultImg from '../../img/default_img.png';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_articles: []
    };
  }

  componentDidMount = () => {
    const token = localStorage.getItem('token');
    axios
      .get('http://127.0.0.1:5000/articles', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        return this.setState({
          all_articles: res.data
        });
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
              <div className='card-header text-right'>@{article.name}</div>
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
          {this.state.all_articles.length ? (
            this.renderArticles(this.state.all_articles)
          ) : (
            <h1>No Articles</h1>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
