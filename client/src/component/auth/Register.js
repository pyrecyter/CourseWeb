import React ,{ Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {Link , Redirect} from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import {register } from '../../actions/auth'; 
import PropTypes from 'prop-types';





const Register =({ setAlert, register,isAuthenticated }) => {
        const [formData, setFormData] =useState({
            firstname:'',
            lastname:'',
            email:'', 
            sid:'',
            password:'',
            confpassword:''
        });

        const {firstname, lastname, email,sid,password,confpassword} =formData;

        const onChange = e =>setFormData({...formData, [e.target.name]:e.target.value});

        const onSubmit = async e =>{
            e.preventDefault();

            if(password !== confpassword){
                setAlert('Password Do not match!!', 'danger');
            }
            else{
                register({firstname, lastname,email,sid,password});
                 
            }
        }


if(isAuthenticated){
  return <Redirect to ='/studentdashboard' />
}
    
       
        return(
        <Fragment>
            
        <ul className="collection">
           <section className="container">
           <li className="collection-item">
      <h1 className="large text-primary">Sign Up</h1>
        
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      </li>
      <li className="collection-item">
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="input-field col s6">
        <i class="material-icons prefix">account_circle</i>
          <input className="validate" type="text"  name="firstname" value={firstname} onChange={e => onChange(e)}  />
          <label for="firstname">First Name</label>
        </div>
        <div className="input-field col s6form-group">
        <i class="material-icons prefix"></i>
          <input type="text" name="lastname"value={lastname} onChange={e => onChange(e)}  />
          <label for="lastname">Last Name</label>
        </div>
        <div className="input-field col s6">
        <i class="material-icons prefix">email</i>
          <input type="email"  name="email" value={email} onChange={e => onChange(e)}  />
          <label for="email">Email</label>
        </div>
        <div className="input-field col s6">
        <i class="material-icons prefix">credit_card</i>
          <input type="text"  name="sid"value={sid} onChange={e => onChange(e)}  />
          <label for="sid">Student ID</label>
        </div>
        
        <div className="input-field col s6">
        <i class="material-icons prefix">lock</i>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
          />
          <label for="password">Password</label>
        </div>
        <div className="input-field col s6">
        <i class="material-icons prefix"></i>
          <input
            type="password"
            name="confpassword"
            value={confpassword}
            onChange={e => onChange(e)}
          />
          <label for="password">Confirm Password</label>
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
      </li>
    </section>
    </ul>
    </Fragment>

        )
    }


Register.propTypes ={
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool

};
const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register }) (Register);

