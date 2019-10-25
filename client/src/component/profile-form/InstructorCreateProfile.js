import React, {useState, Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from  'prop-types';
import { connect }  from 'react-redux';
import { createProfile } from '../../actions/instructorprofile';




const CreateProfile = ({ createProfile, history}) => {
    const [formData, setFormData] = useState({
        location:'',
        skills:'',
        status:'',
        bio:'',
        faculty:''
    });

    const {
        location,
        skills,
        status,
        bio,
        faculty
    } = formData;

const onChange = e=> setFormData({...formData,[e.target.name]:  e.target.value});

 const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
}


    return(
       
            <Fragment>
            <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      
      <form className="form" onSubmit={e =>onSubmit(e)}>
        
       
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
          <small className="form-text"
            >City  state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)}/>
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Faculty" name="faculty" value={faculty} onChange={e => onChange(e)}/>
          
        </div>
        <div className="form-group">
          <input type="text" placeholder="Status" name="status" value={status} onChange={e => onChange(e)}/>
          
        </div>


        
       
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="/instructordashboard">Go Back</a>
      </form>
</Fragment>
     );
};

CreateProfile.propTypes ={
    createProfile: PropTypes.func.isRequired
}
export default connect(null, {createProfile}) (withRouter(CreateProfile));