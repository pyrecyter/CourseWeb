import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import { getCurrentProfile} from '../../actions/profile';
import ProfileDashboardAction from './ProfileDashboardAction';





const ProfileDashboard = ({ getCurrentProfile, auth:{  }, profile: { profile, loading}}) =>{
    useEffect(() =>{
        getCurrentProfile();
        
        
        
        
      }, []);
    

    return loading && profile == null ? <Spinner/>: <Fragment>
        <h1 className="large text-primary">Profile Dashboard</h1>
        <br/>
        <Link to="/studentdashboard"><button type="button" class="btn btn-secondary btn-sm" >Go to Previous Page</button></Link>
        <p className="lead">
            <i className="fas fa-user">Welcome  {profile && profile.githubusername}</i>
        </p>
        {profile !== null ? 
        <Fragment>
            <ProfileDashboardAction/>
        </Fragment> : <Fragment><p>You have to create a profile, Add some Info</p>
        <Link to='create-profile' className='btn btn-primary my-1'>
        Create Profile 
        </Link></Fragment>}
    </Fragment>;
};
 ProfileDashboard.propTypes ={
     getCurrentProfile: PropTypes.func.isRequired,
     auth: PropTypes.object.isRequired,
     profile: PropTypes.object.isRequired

 }; 


 const mapStateToProps = state =>({
     auth: state.auth,
     profile: state.profile
 });

 export default connect(mapStateToProps, { getCurrentProfile }) (ProfileDashboard);
