import React from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { getUserDetails } from '../redux/actions';

class Comments extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       comments: []
  //     };
  //   }

  //   componentDidMount = () => {
  //     axios
  //       .get(`http://127.0.0.1:5000/articles/${this.props.article_id}/comments`)
  //       .then(res => {
  //         if (!res.data.error) {
  //           this.setState({
  //             comments: res.data.comments
  //           });
  //         }
  //       });
  //   };

  renderComments = () => {
    return this.props.comments.map(comment => {
      return (
        <div key={comment.id} className='text-center border'>
          <h5>{comment.data}</h5>
          <h6>by: @{comment.name}</h6>
          {this.props.user_details.user_id === comment.user_id ? (
            <React.Fragment>
              <button>delete</button>
              <button>edit</button>
            </React.Fragment>
          ) : null}
        </div>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.comments.length ? (
          this.renderComments()
        ) : (
          <h3 className='text-center'>No Comments</h3>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user_details: state.user_details
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserDetails: () => dispatch(getUserDetails())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
