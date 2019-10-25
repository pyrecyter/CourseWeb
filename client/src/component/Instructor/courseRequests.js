import React, {Component, Fragment,useState } from 'react';
import {Link , Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import {  Button } from 'react-bootstrap';

const Course = props => (
    <tr>{props.course.status === 0 ? <tr>
            <td>{props.course.name}</td>
            <td><Button variant="success" onClick={
               async () => {
               await axios.request({
                    method:'post',
                    url:`/api/instructor/${localStorage.getItem('uid')}/course/add/${props.course.name}/1`,
                    data:{}
                }).then(response => {
                    alert("Course Accepted!");window.history.go(-1);
                }).catch(err => {console.log(err);alert(err)});
               } 
            }>Accept</Button></td>
            <td><Button variant="danger" onClick={
               async () => {
               await axios.request({
                    method:'post',
                    url:`/api/instructor/${localStorage.getItem('uid')}/course/add/${props.course.name}/2`,
                    data:{}
                }).then(response => {
                    alert("Course Rejected !");window.history.go(-1);
                }).catch(err => {console.log(err);alert(err)});
               } 
            }>Reject</Button></td>
        </tr>: console.log()} 
    </tr>
)

class CourseReq extends Component {
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
               <div>
                    <h3>Your requests</h3>
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


export default CourseReq;