import React, { Fragment,useState, Component } from 'react';
import { connect } from 'react-redux';
import {Link , Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import InstructorNav from '../layout/Nav/InstructorNav';



class Assignment extends Component {
  constructor(props){
    super(props);
    
    this.state={
        course: localStorage.getItem('course'),
        
    
    }
    this.onSubmit = this.onSubmit.bind(this);
    
}

onSubmit(e){
  const userdetail = {
    lectureName:this.refs.lectureName.value,
    comittedUrl:this.refs.comittedUrl.value,
    course:this.state.course

}

console.log(userdetail)
        e.preventDefault();

        axios.request({
            method:'post',
            url:'/api/lecture',
            data:userdetail
        }).then(response => {
            alert("Lecture Added!");
        }).catch(err => {console.log(err);alert(err)});
      }

    
   render(){
    const {course} = this.state;
    return(
    <Fragment><br/><InstructorNav/>
        
    <ul className="collection">
       <section className="container">
       <li className="collection-item">
  <h1 className="large text-primary">Add Lecture</h1>
    
  <p className="lead"><i className="fas fa-user"></i> Add Lecture for {this.state.course}</p>
  </li>
  <li className="collection-item">
  <form className="form" onSubmit={this.onSubmit.bind(this)}>
  <div className="input-field col s6">
    <i class="material-icons prefix">add_to_photos</i>
      <input required type="text"  name="assignmentName" ref= "lectureName" />
      <label for="assignmentName">Lecture Name</label>
    </div>    
    <div className="input-field col s6form-group">
    <i class="material-icons prefix">archive</i>
      <input required type="url" name="dueDate" ref ="comittedUrl"  />
      <label for="dueDate">Url</label>
    </div>
    <div className="input-field col s6">
      <input required type="hidden"  name="course" value={course}   />
    </div>
    <input type="submit" className="btn btn-primary" value="Add Lecture" />
  </form>

  </li>
</section>
</ul>
</Fragment>

    )}
}

Assignment.propTypes ={
assignment: PropTypes.func.isRequired,
isAuthenticated: PropTypes.bool

};
const mapStateToProps = state =>({
isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps) (Assignment);