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
    assignmentName:this.refs.assignmentName.value,
    dueDate:this.refs.dudeDate.value,
    course:this.state.course

}

console.log(userdetail)
        e.preventDefault();

        axios.request({
            method:'post',
            url:'/api/assignment/',
            data:userdetail
        }).then(response => {
            alert("Assignment Added!");
        }).catch(err => {console.log(err);alert(err)});
      }

    
   render(){
    const {course} = this.state;
    return(
    <Fragment><br/><InstructorNav/>
    <br/>
    <Link to="/instructordashboard"><button type="button" class="btn btn-secondary btn-sm" >Go to Previous Page</button></Link>

    <ul className="collection">
       <section className="container">
       <li className="collection-item">
  <h1 className="large text-primary">Add Assignment</h1>
    
  <p className="lead"><i className="fas fa-user"></i> Add Assignment for {this.state.course}</p>
  </li>
  <li className="collection-item">
  <form className="form" onSubmit={this.onSubmit.bind(this)}>
  <div className="input-field col s6">
    <i class="material-icons prefix">assignment_turned_in</i>
      <input required type="text"  name="assignmentName" ref= "assignmentName" />
      <label for="assignmentName">Assignment</label>
    </div>    
    <div className="input-field col s6form-group">
    <i class="material-icons prefix">access_time</i>
      <input required type="date" name="dueDate" ref ="dudeDate"  />
      <label for="dueDate">Due Date</label>
    </div>
    <div className="input-field col s6">
      <input required type="hidden"  name="course" value={course}   />
    </div>
    <input type="submit" className="btn btn-primary" value="Add Assignment" />
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