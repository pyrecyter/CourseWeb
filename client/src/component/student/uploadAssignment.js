import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {Link , Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';


const Assignment =({ isAuthenticated }) => {
const [formData, setFormData] = useState({
    comittedUrl:'',
    modifiedDate:''
});

const {comittedUrl, modifiedDate} =formData;

const onChange = e =>setFormData({...formData, [e.target.name]:e.target.value});

const onSubmit = async e =>{
    e.preventDefault();
    axios.request({
        method:'post',
        url:'/api/assignment',
        data:formData
    }).then(response => {
        alert("Assignment Added!");
    }).catch(err => {console.log(err);alert(err)});
}


if(!isAuthenticated){
return <Redirect to ='/adminlogin' />
}


return(
    <Fragment>
        <br/>
        <Link to="/StudentDashboard"><button type="button" class="btn btn-secondary btn-sm" >Go to Previous Page</button></Link>
       
    <ul className="collection">
       <section className="container">
       <li className="collection-item">
  <h1 className="large text-primary">Upload Assignment</h1>
    
  <p className="lead"><i className="fas fa-user"></i> Upload Assignment</p>
  </li>
  <li className="collection-item">
  <form className="form" onSubmit={e => onSubmit(e)}>
  <div className="input-field col s6">
    <i class="material-icons prefix"></i>
      <input required type="url"  name="comittedUrl" value={comittedUrl} onChange={e => onChange(e)}  />
      <label for="assignmentName">Commited URL</label>
    </div>    
    <div className="input-field col s6form-group">
    <i class="material-icons prefix"></i>
      <input required type="date" name="modifiedDate" value={modifiedDate} onChange={e => onChange(e)}  />
      <label for="dueDate">Modified Date</label>
    </div>        
    <div className="input-field col s6">
    </div>
    <input type="submit" className="btn btn-primary" value="Save Changes" />
  </form>

  </li>
</section>
</ul>
</Fragment>

    )
}

Assignment.propTypes ={
    assignment: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
    
    };
    const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
    });

export default connect(mapStateToProps) (Assignment);