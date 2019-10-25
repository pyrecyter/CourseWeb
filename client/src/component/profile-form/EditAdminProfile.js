import React, {useState, Fragment, useEffect} from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from  'prop-types';
import { connect }  from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/adminprofile';




const EditProfile = ({profile:{profile,loading}, createProfile,getCurrentProfile, history}) => {
    const [formData, setFormData] = useState({
        location:'',
        skills:'',
        bio:'',
        faculty:''   
    });

    useEffect(() =>{
        getCurrentProfile();
        setFormData({
            location: loading || !profile.location ? '' : profile.location,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            faculty: loading || !profile.faculty ? '' : profile.faculty,
            bio: loading || !profile.bio ? '' : profile.bio


        });
    }, [loading]);

    const {
        location,
        skills,
        bio,
        faculty,
    } = formData;

const onChange = e=> setFormData({...formData,[e.target.name]:  e.target.value});

 const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
}

    return(
       
            <Fragment>
                 <br />
      <Link to="/AdminDashboard"><button type="button" class="btn btn-secondary btn-sm" >Go to Previous Page</button></Link>
            <h1 className="large text-primary">
        Edit Your Profile
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
            
       
        <input type="submit" className="btn btn-primary my-1" />
        
      </form>
</Fragment>
     );
};

EditProfile.propTypes ={
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile : state.profile
});
export default connect(mapStateToProps, {createProfile, getCurrentProfile}) (withRouter(EditProfile));