import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../auth/Login';
import Dashboard from '../commons/Dashboard';

function Routes(props) {
  return (
    <React.Fragment>
      <Switch>
        <Route
          path='/dashboard'
          render={routeProps =>
            props.isLogged ? (
              <Dashboard {...routeProps} />
            ) : (
              <Login {...routeProps} />
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
          render={() => {
            return props.isLogged ? (
              <Redirect push to='/dashboard' />
            ) : (
              <Redirect push to='/login' />
            );
          }}
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
