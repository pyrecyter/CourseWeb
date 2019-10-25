import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const Admin = ({ isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''

  });

  const { firstname, lastname, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    axios.request({
      method: 'post',
      url: '/api/admin',
      data: formData
    }).then(response => {
      alert("Admin Added!");
      
    }).catch(err => { console.log(err); alert(err) });
  }


  if (!isAuthenticated) {
    return <Redirect to='/adminlogin' />
  }


  return (
    <Fragment>
      <br />
      <Link to="/AdminDashboard"><button type="button" class="btn btn-secondary btn-sm" >Go to Previous Page</button></Link>
      <ul className="collection">
        <section className="container">
          <li className="collection-item">
            <h1 className="large text-primary">Add Admin</h1>

            <p className="lead"><i className="fas fa-user"></i> Add Admin to the system</p>
          </li>
          <li className="collection-item">
            <form className="form" onSubmit={e => onSubmit(e)}>
              <div className="input-field col s6">
                <i class="material-icons prefix">account_circle</i>
                <input required type="text" name="firstname" value={firstname} onChange={e => onChange(e)} />
                <label for="firstname">First Name</label>
              </div>
              <div className="input-field col s6form-group">
                <i class="material-icons prefix"></i>
                <input required type="text" name="lastname" value={lastname} onChange={e => onChange(e)} />
                <label for="lastname">Last Name</label>
              </div>
              <div className="input-field col s6">
                <i class="material-icons prefix">email</i>
                <input required type="email" name="email" value={email} onChange={e => onChange(e)} />
                <label for="email">Email</label>
              </div>
              <div className="input-field col s6">
                <i class="material-icons prefix">lock</i>
                <input required type="password" name="password" value={password} onChange={e => onChange(e)} />
                <label for="password">Password</label>
              </div>
              <div className="input-field col s6">
              </div>
              <input type="submit" className="btn btn-primary" value="Add Admin" />
            </form>

          </li>
        </section>
      </ul>
    </Fragment>

  )
}

Admin.propTypes = {
  admin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool

};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Admin);