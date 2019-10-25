import React, { Component } from 'react';
import { Card, CardDeck, Button } from 'react-bootstrap';
import { Navbar, Nav, NavDropdown, Accordion, NavItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Form, FormControl } from 'react-bootstrap';
import StudentNav from '../layout/Nav/StudentNav';

import { MDBView, MDBMask } from
    "mdbreact";
import { Link } from 'react-router-dom';

const StudentDashboard = props => {

    return (
        <div>
            <br />
            <StudentNav/>
            <br />
            <br />
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Latest Announcements
                        </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                    Submission of A/L Certified True Copy of Result Sheet before 31st June 2019
                        </Accordion.Toggle>

                            </Card>

                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                    Iteractive Media Workshop on 24th June 2019
                        </Accordion.Toggle>

                            </Card>

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <CardDeck>
                <Card>
                    <Card.Img variant="top" src="https://s27942.pcdn.co/wp-content/uploads/2017/10/Oxford-university-leaks-student-details.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >
                            <Button variant="primary">Academic Affairs Notices</Button>
                        </div>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://image.freepik.com/free-photo/happy-teacher-with-students-background_1098-2917.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >

                            <Link to="/profiledashoard"><Button variant="primary">View Profile</Button></Link>
                        </div>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://www.transglobeedu.com/wp-content/uploads/2019/03/Benefits-Students-get-with-Higher-Studies-in-Overseas.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >

                            <Button variant="primary">International Program Notices</Button>
                        </div>
                    </Card.Body>
                </Card>
            </CardDeck>
        </div>
    );

}
StudentDashboard.propTypes = {

}

export default StudentDashboard;