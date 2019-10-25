import React, {useState, Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from  'prop-types';
import { connect }  from 'react-redux';
import { createProfile } from '../../actions/profile';




const CreateProfile = ({ createProfile, history}) => {
    const [formData, setFormData] = useState({
        location:'',
        skills:'',
        status:'',
        githubusername:'',
        bio:'',
        faculty:'',
        course:''
    });

    const {
        location,
        skills,
        status,
        githubusername,
        bio,
        faculty,
        course
    } = formData;

const onChange = e=> setFormData({...formData,[e.target.name]:  e.target.value});

 const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
}


    return(
       
            <Fragment>
              <br/>
                    <Link to="/studentdashboard"><button type="button" class="btn btn-secondary btn-sm" >Go to Previous Page</button></Link>

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
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername} onChange={e => onChange(e)}
          />
          <small className="form-text" >If you want your latest repos and a Github link, include your
            username</small>
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Faculty" name="faculty" value={faculty} onChange={e => onChange(e)}/>
          
        </div>
        <div className="form-group">
          <input type="text" placeholder="Course" name="course" value={course} onChange={e => onChange(e)}/>
          
        </div>
        <div className="form-group">
          <input type="text" placeholder="Status" name="status" value={status} onChange={e => onChange(e)}/>
          
        </div>


        
       
        <input type="submit" className="btn btn-primary my-1" />
       
      </form>
</Fragment>
     );
};

CreateProfile.propTypes ={
    createProfile: PropTypes.func.isRequired
}
export default connect(null, {createProfile}) (withRouter(CreateProfile));