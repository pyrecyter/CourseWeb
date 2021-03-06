import React ,{ Fragment, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {AdminLogin} from '../../actions/auth';




const AdLogin =({AdminLogin, isAuthenticated}) => {
        const [formData, setFormData] =useState({
            
            email:'',
            password:''
            
        });

        const { email,password} =formData;

        const onChange = e =>setFormData({...formData, [e.target.name]:e.target.value});

        const onSubmit = async e =>{
            e.preventDefault();
            AdminLogin(email,password);
            console.log(formData);
           
        };
        
//redirect if Login
if(isAuthenticated){
  return <Redirect to="/adminDashboard"/> 
}
    
       
        return(
        <Fragment>
            <br/>
        <ul className="collection">
           <section className="container">
           <li className="collection-item">
      <h1 className="large text-primary">Admin</h1>
        
      <p className="lead"><i className="fas fa-user"></i> Login to Admin</p>
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
        
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      
      
      </li>
    </section>
    </ul>
    </Fragment>

        )
    }


AdLogin.propTypes ={
  AdminLogin: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool
}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{ AdminLogin}) (AdLogin);
