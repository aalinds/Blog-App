import React from 'react';
import Routes from './components/routes/Routes';
import { loginUser } from './components/redux/actions';
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
            this.props.loginUser(true);
          }
        });
    }
  };
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Routes />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: () => dispatch(loginUser())
  };
};

export default connect(null, mapDispatchToProps)(App);
