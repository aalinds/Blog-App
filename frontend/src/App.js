import React from 'react';
import Routes from './components/routes/Routes';
import { loginUser, toggleLoading } from './components/redux/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import Navbar from './components/commons/Navbar';

class App extends React.Component {
  componentDidMount = () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://127.0.0.1:5000/auth/details', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          if (!res.data.error) {
            this.props.loginUser(res.data.user);
          }
        });
    } else {
      this.props.toggleLoading();
    }
  };
  render() {
    return (
      <React.Fragment>
        <Navbar />
        {!this.props.isLoading ? <Routes /> : null}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => dispatch(loginUser(user)),
    toggleLoading: () => dispatch(toggleLoading())
  };
};

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
