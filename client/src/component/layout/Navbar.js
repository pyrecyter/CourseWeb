import React ,{ Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Nav =({auth:{isAuthenticated, loading}, logout}) => {
  const authLinks=(
    <ul id="nav-mobile" className="right hide-on-small-only">
    <li>
      <a onClick={  logout } href="/">
        <i className ="i fas fa-sign-out-alt"></i>{''}
        <span  className = "hide-sm">LogOut</span></a>
    </li>
    
  </ul>
  );

  const guestLinks = (
    <ul id="nav-mobile" className="right hide-on-small-only">
    <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
    <li><Link to="/login"><i className="fas fa-sign-in-alt"></i>  Log In</Link></li>
    <li><Link to="/register"><i className="fas fa-user-plus"></i>  Sign Up</Link></li>
  </ul>
  );
    
        return(
            <div>
                <nav className="black darken-3">
                    <div className="nav-wrapper">
                      <a href="#!" className="brand-logo left"><i className="fas fa-paper-plane"></i> CoursePortal</a>
                          {!loading && (<Fragment>{isAuthenticated ? authLinks: guestLinks}</Fragment>)}
     
     
    </div>
   
  </nav>

  
            </div>
        )
    }

Nav.propTypes ={
  logout:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
};

const mapStateToProps = state =>({
  auth: state.auth
})



export default connect(mapStateToProps,{ logout}) (Nav);
