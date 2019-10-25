import React, { Component } from 'react';
import { Card, CardDeck, Button, NavItem } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import InstructorNav from '../layout/Nav/InstructorNav';
import Assignment from '../Instructor/viewCompletedAssignment';
import Lecture from '../Instructor/viewComittedLectures';


class courseSubmit extends Component{
    
    constructor(props){
        super(props);
        
        this.state={
            course: this.props.location.course,
        };
        if(this.state.course){
        localStorage.setItem('course',this.state.course)
        }else{
            this.state.course = localStorage.getItem('course')
        }

    }
    render(){
    return (
        <div>                <br />
            <InstructorNav/>
            <br />
            <br />
            <CardDeck>
                <Card>
                    <Card.Img variant="top" src="https://s16815.pcdn.co/wp-content/uploads/2019/05/tips-for-teaching-190515.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >
                        <Link to={{pathname:"submit/lecture", courseID:this.state.course}}>
                            <Button variant="primary">Add Lectures</Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://s16815.pcdn.co/wp-content/uploads/2015/09/resized-photo-for-Huang-article.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >
                            <Link to={{pathname:"submit/assignment", courseID:this.state.course}}>
                            <Button variant="primary">Add Assignments</Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>

            </CardDeck>
            <Assignment course = {this.state.course}/>

            <Lecture course = {this.state.course}/>
            
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    );
    }

}


export default  courseSubmit;