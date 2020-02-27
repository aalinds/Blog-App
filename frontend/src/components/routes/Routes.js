import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../auth/Login';
import Dashboard from '../commons/Dashboard';
import Register from '../auth/Register';
import Profile from '../user/Profile';
import AddArticle from '../articles/AddArticle';

function Routes(props) {
  return (
    <React.Fragment>
      <Switch>
        <Route
          path='/addarticle'
          render={routeProps =>
            props.isLogged ? (
              <AddArticle {...routeProps} />
            ) : (
              <Redirect push to='/login' />
            )
          }
        />
        <Route
          path='/profile'
          render={routeProps =>
            props.isLogged ? (
              <Profile {...routeProps} />
            ) : (
              <Redirect push to='/login' />
            )
          }
        />
        <Route
          path='/dashboard'
          render={routeProps =>
            props.isLogged ? (
              <Dashboard {...routeProps} />
            ) : (
              <Redirect push to='/login' />
            )
          }
        />
        <Route
          path='/register'
          render={routeProps =>
            props.isLogged ? (
              <Redirect to='/dashboard' />
            ) : (
              <Register {...routeProps} />
            )
          }
        />
        <Route
          path='/login'
          render={routeProps =>
            props.isLogged ? (
              <Redirect push to='/dashboard' />
            ) : (
              <Login {...routeProps} />
            )
          }
        />
        <Route
          path='/'
          exact
          render={() =>
            props.isLogged ? (
              <Redirect push to='/dashboard' />
            ) : (
              <Redirect push to='/login' />
            )
          }
        />
      </Switch>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    isLogged: state.isLogged
  };
};

export default connect(mapStateToProps)(Routes);
