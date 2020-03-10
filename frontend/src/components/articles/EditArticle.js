import React from 'react';
import axios from 'axios';

class EditArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {
        title: '',
        content: '',
        category_id: ''
      },
      categories: []
    };
  }

  componentDidMount = () => {
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
          const article = res.data.article;
          this.setState({
            article: {
              title: article.title,
              content: article.content,
              category_id: article.category_id
            }
          });
        }
      });

    axios.get('http://127.0.0.1:5000/categories').then(res => {
      if (!res.data.error) {
        this.setState({
          categories: res.data.categories
        });
      }
    });
  };

  changeHandler = e => {
    this.setState({
      article: {
        ...this.state.article,
        [e.target.name]: e.target.value
      }
    });
  };

  formSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios
      .post('http://127.0.0.1:5000/articles', this.state.article, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (!res.data.error) {
          alert(res.data.message);
          this.props.history.push('/dashboard');
        }
      });
  };

  render() {
    return (
      <div className='container'>
        {console.log(this.state)}
        <form onSubmit={this.formSubmit}>
          <div className='form-group'>
            <input
              type='text'
              name='title'
              className='form-control'
              placeholder='Title'
              value={this.state.article.title}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div className='form-group'>
            <select
              className='form-control custom-select'
              value={this.state.article.category_id}
              onChange={this.changeHandler}
              name='category_id'
              required
            >
              <option value='' disabled>
                Select a category
              </option>
              {this.state.categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <textarea
              type='text'
              name='content'
              className='form-control'
              placeholder='Article Content'
              value={this.state.article.content}
              onChange={this.changeHandler}
              rows='10'
              required
            />
          </div>
          <input type='submit' className='btn btn-info' value='Edit Article' />
        </form>
      </div>
    );
  }
}

export default EditArticle;
