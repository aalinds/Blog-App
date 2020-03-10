import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions';

function Navbar(props) {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link to='/' className='navbar-brand'>
        Blog App
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav ml-auto'>
          {props.isLogged ? (
            <React.Fragment>
              <li className='nav-item'>
                <Link to='/myarticles' className='nav-link'>
                  My Articles
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/addarticle' className='nav-link'>
                  Add Article
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/profile' className='nav-link'>
                  Profile
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/'
                  className='nav-link'
                  onClick={() => {
                    localStorage.clear();
                    props.logoutUser();
                  }}
                >
                  Logout
                </Link>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li className='nav-item'>
                <Link to='/login' className='nav-link'>
                  Login
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/register' className='nav-link'>
                  Register
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
}

const mapStateToProps = state => {
  return { isLogged: state.isLogged };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
