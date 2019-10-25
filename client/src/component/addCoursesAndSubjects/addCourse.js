import React ,{ Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {Link , Redirect} from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';





const Register =({ setAlert, register,isAuthenticated }) => {
        const [formData, setFormData] =useState({
            coursename:'',
            faculty:'',
            status:'', 
            enrollmentKey:'',
            courseCredits:''
        });

        const {firstname, lastname, email,password,confpassword} =formData;

        const onChange = e =>setFormData({...formData, [e.target.name]:e.target.value});

        const onSubmit = async e =>{
            e.preventDefault();

            if(password !== confpassword){
                setAlert('Password Do not match!!', 'danger');
            }
            else{
                register({firstname, lastname,email,password});
                 
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
      <h1 className="large text-primary">Add Course</h1>
        
      </li>
      <li className="collection-item">
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="input-field col s6">
        <i class="material-icons prefix"></i>
          <input className="validate" type="text"  name="firstname" value={firstname} onChange={e => onChange(e)}  />
          <label for="firstname">Coursename</label>
        </div>
        <div className="input-field col s6form-group">
        <i class="material-icons prefix"></i>
          <input type="text" name="lastname"value={lastname} onChange={e => onChange(e)}  />
          <label for="lastname">Faculty</label>
        </div>
        <div className="input-field col s6form-group">
        <i class="material-icons prefix"></i>
          <input type="text" name="lastname"value={lastname} onChange={e => onChange(e)}  />
          <label for="lastname">Status</label>
        </div>
        <div className="input-field col s6form-group">
        <i class="material-icons prefix"></i>
          <input type="text" name="lastname"value={lastname} onChange={e => onChange(e)}  />
          <label for="lastname">Enrollment Key</label>
        </div>
        <div className="input-field col s6form-group">
        <i class="material-icons prefix"></i>
          <input type="text" name="lastname"value={lastname} onChange={e => onChange(e)}  />
          <label for="lastname">Course Credits</label>
        </div>
       
       
        <input type="submit" className="btn btn-primary" value="Add Course" />
      </form>

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

export default connect(mapStateToProps, { setAlert }) (Register);

//export default connect(mapStateToProps, { setAlert, register }) (Register);

