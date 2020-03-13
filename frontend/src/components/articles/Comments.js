import React from 'react';
import { connect } from 'react-redux';
import { getUserDetails } from '../redux/actions';

class Comments extends React.Component {
  renderComments = () => {
    return this.props.comments.map(comment => {
      return (
        <div key={comment.id} className='text-center bg-light border m-2 p-1'>
          <h5>{comment.data}</h5>
          <h6>by: @{comment.name}</h6>
          {this.props.user_details.user_id === comment.user_id ? (
            <React.Fragment>
              <button
                onClick={() => this.props.commentDeleteHandler(comment.id)}
              >
                delete
              </button>
              {/* <button>edit</button> */}
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
