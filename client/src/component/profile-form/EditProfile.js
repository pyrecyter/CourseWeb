import React, {useState, Fragment, useEffect} from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from  'prop-types';
import { connect }  from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';




const EditProfile = ({profile:{profile,loading}, createProfile,getCurrentProfile, history}) => {
    const [formData, setFormData] = useState({
        location:'',
        skills:'',
        status:'',
        githubusername:'',
        bio:'',
        faculty:'',
        course:''
    });

    useEffect(() =>{
        getCurrentProfile();
        setFormData({
            location: loading || !profile.location ? '' : profile.location,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            status: loading || !profile.status ? '' : profile.status,
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            faculty: loading || !profile.faculty ? '' : profile.faculty,
            bio: loading || !profile.bio ? '' : profile.bio,
            course: loading || !profile.course ? '' : profile.course,


        });
    }, [loading]);

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
    createProfile(formData, history, true);
}

    return(
       
            <Fragment>
                 <br />
      <Link to="/studentdashboard"><button type="button" class="btn btn-secondary btn-sm" >Go to Previous Page</button></Link>
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

EditProfile.propTypes ={
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile : state.profile
});
export default connect(mapStateToProps, {createProfile, getCurrentProfile}) (withRouter(EditProfile));