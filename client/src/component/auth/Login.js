import React ,{ Fragment, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';




const Login =({login, isAuthenticated}) => {
        const [formData, setFormData] =useState({
            
            email:'',
            password:''
            
        });

        const { email,password} =formData;

        const onChange = e =>setFormData({...formData, [e.target.name]:e.target.value});

        const onSubmit = async e =>{
            e.preventDefault();
            login(email,password);
            console.log(formData);
           
        };
        
//redirect if Login
if(isAuthenticated){
  return <Redirect to="/studentdashboard"/> 
}
    
       
        return(
        <Fragment>
            <br/>
        <ul className="collection">
           <section className="container">
           <li className="collection-item">
      <h1 className="large text-primary">Sign In</h1>
        
      <p className="lead"><i className="fas fa-user"></i> Sign In to Your Account</p>
      </li>
      <li className="collection-item">
      <form className="form" onSubmit={e => onSubmit(e)}>
        
        
        <div className="input-field col s6">
        <i class="material-icons prefix">email</i>
          <input type="email" name="email" value={email} onChange={e => onChange(e)}  />
          <label for="email">Email</label>
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
        
        <input type="submit" className="btn btn-primary" value="Sign In" />
      </form>
      
      <p className="my-1">
        Dont have a Student account? <Link to="/register">Sign Up </Link>
      </p>
      </li>
    </section>
    </ul>
    </Fragment>

        )
    }


Login.propTypes ={
   login: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool
}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{ login}) (Login);
