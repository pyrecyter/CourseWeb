import React, { Component } from 'react';
import { Card, CardDeck, Button, NavItem } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import InstructorNav from '../layout/Nav/InstructorNav';
import axios from 'axios';

const Course = props => (
    props.course === 0 ? 
     <CardDeck>{console.log(props)}
     <Card bg="danger" text="white" style={{ width: '18rem' }}>
         <Card.Header>You have new pending requests please check !</Card.Header>
     </Card>
     </CardDeck>
     :
     <CardDeck>{console.log(props)}
     <Card bg="danger" text="white" style={{ width: '18rem' }}>
         <Card.Header>You have new pending requests please check !</Card.Header>
     </Card>
     </CardDeck>
     )

const InstructorDashboard = props => {

    let courses = [];
    const get =()=> { axios.get(`/api/instructor/${localStorage.getItem('uid')}`)
            .then((response) => {
               courses=response.data.course
               console.log('pp',courses)
        })
        .catch(err =>{
            if(err){
            console.log(err)
         }
        });
    }
    get();

    function notify(){
        return courses.map(function(currentCourse, i){
            return <Course props={currentCourse} key={i}/>})
    }
         
    return (
        <div>                <br />
            <InstructorNav/>
            <br />
            <br />
            {notify()}
            <CardDeck>
                <Card>
                    <Card.Img variant="top" src="https://s27942.pcdn.co/wp-content/uploads/2017/10/Oxford-university-leaks-student-details.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >
                        <Link to="instructorDashboard/notifications">
                            <Button variant="primary">Pending Requests</Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://image.freepik.com/free-photo/happy-teacher-with-students-background_1098-2917.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >
                            <Link to="instructorDashboard/courses">
                            <Button variant="primary">My courses</Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://image.freepik.com/free-photo/happy-teacher-with-students-background_1098-2917.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >

                            <Link to="/instructorprofiledashboard"><Button variant="primary">View Profile</Button></Link>
                        </div>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Img variant="top" src="https://image.freepik.com/free-photo/happy-teacher-with-students-background_1098-2917.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >

                            <Link to="/instructordashboard/courses/submit/assignment"><Button variant="primary">Add Assignment</Button></Link>
                        </div>
                    </Card.Body>
                </Card>
                </CardDeck>
                <CardDeck>
                <Card>
               <Card.Img variant="top" src="https://image.freepik.com/free-photo/happy-teacher-with-students-background_1098-2917.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >

                            <Link to="/instructordashboard/courses/submit/lecture"><Button variant="primary">Add Lecture</Button></Link>
                        </div>
                    </Card.Body>
                </Card>

                <Card>
               <Card.Img variant="top" src="https://image.freepik.com/free-photo/happy-teacher-with-students-background_1098-2917.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >

                            <Link to="/viewInstructorAssignment"><Button variant="primary">View Assignments</Button></Link>
                        </div>
                    </Card.Body>
                </Card>

                

            </CardDeck>
        </div>
    );

}
InstructorDashboard.propTypes = {

}


export default InstructorDashboard;