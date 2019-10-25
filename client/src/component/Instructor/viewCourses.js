import React, {Component, Fragment,useState } from 'react';
import {Link , Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const Course = props => (
    <tr>{props.course.status === 1 ? <Link to={{pathname: "./courses/get", course:props.course.name }}><td>{props.course.name}</td> </Link>: console.log('restricted courses detected')} 
    </tr>
)

class Courseload extends Component {
    constructor(props){
        super(props)

        this.state ={
            userid:localStorage.getItem('uid'),
            courses : [],
        };
    }

    componentDidMount(){
        console.log(this.state.userid)
        axios.get(`/api/instructor/${this.state.userid}`)
        .then((response) => {
            this.setState({
             courses:response.data.course
            });
        })
        .catch(err =>{
            if(err){
                console.log(err)
            }
        });
        
    }

    CourseList(){
        return this.state.courses.map(function(currentCourse, i){
            return <Course course={currentCourse} key={i}/>
         })
     }


    render(){
        return(
            <div>
                    <Link to="/instructordashboard"><button type="button" class="btn btn-secondary btn-sm" >Go to Previous Page</button></Link>

               <div>
                    <h3>Your Courses</h3>
                    <table className="table table-striped" style={{ marginTop: 20 }} >
                        <tbody>
                            { this.CourseList() }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
      
  }


export default Courseload;