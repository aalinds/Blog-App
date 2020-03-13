import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_articles: [],
      total_pages: 1,
      per_page: 5,
      curr_page: 1
    };
  }

  getArticles = (page_no, per_page) => {
    const token = localStorage.getItem('token');
    axios
      .get(
        `http://127.0.0.1:5000/articles?page=${page_no}&per_page=${per_page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        return this.setState({
          ...this.state,
          all_articles: res.data.articles,
          total_pages: res.data.total_pages
        });
      });
  };

  componentDidUpdate = () => {
    let usp = new URLSearchParams(this.props.location.search);
    let curr_page = Number(usp.get('page')) || 1;
    let per_page = Number(usp.get('per_page')) || 5;
    if (
      curr_page !== this.state.curr_page ||
      per_page !== this.state.per_page
    ) {
      this.setState({
        ...this.state,
        curr_page: curr_page,
        per_page: per_page
      });
      this.getArticles(curr_page, per_page);
    }
  };

  componentDidMount = () => {
    const usp = new URLSearchParams(this.props.location.search);
    let curr_page = usp.get('page') || 1;
    let per_page = usp.get('per_page') || 5;
    this.setState(
      {
        ...this.state,
        curr_page: curr_page,
        per_page: per_page
      },
      () => {
        this.getArticles(curr_page, per_page);
      }
    );
  };

  renderArticles = articles => {
    return articles.map(article => {
      return (
        <div className='card m-1' style={{ width: '25rem' }} key={article.id}>
          <div className='row'>
            <div className='col'>
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

  changeHandler = event => {
    let value = Number(event.target.value);

    this.setState(
      {
        ...this.state,
        per_page: value,
        curr_page: 1
      },
      () => {
        this.props.history.push(
          `${this.props.match.url}?page=${1}&per_page=${value}`
        );
      }
    );
  };

  renderPagination = () => {
    let total_pages = this.state.total_pages;
    let lists_to_render = [];

    for (let i = 1; i <= total_pages; i++) {
      lists_to_render.push(
        <li className='page-item' key={i}>
          <Link
            to={`${this.props.match.url}?page=${i}&per_page=${this.state.per_page}`}
            className='page-link'
          >
            {i}
          </Link>
        </li>
      );
    }

    return lists_to_render;
  };

  render() {
    return (
      <div className='container'>
        <div className='row justify-content-around'>
          {this.state.all_articles.length ? (
            <React.Fragment>
              <div className='row'>
                <select
                  name='per_page'
                  onChange={this.changeHandler}
                  value={this.state.per_page}
                  className='m-2'
                >
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='15'>15</option>
                  <option value='20'>20</option>
                </select>
              </div>
              <div className='row justify-content-center'>
                {this.renderArticles(this.state.all_articles)}
              </div>
              <div className='row justify-content-center m-2'>
                <nav>
                  <ul className='pagination'>
                    <li className='page-item'>
                      <Link to='#' className='page-link'>
                        Start
                      </Link>
                    </li>

                    {this.renderPagination()}

                    <li className='page-item'>
                      <Link to='#' className='page-link'>
                        End
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </React.Fragment>
          ) : (
            <h1>No Articles</h1>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
