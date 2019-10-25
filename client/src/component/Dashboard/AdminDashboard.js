import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card, CardDeck, Button } from 'react-bootstrap';
import PropType from 'prop-types';
import AdminNav from '../layout/Nav/AdminNav';



const AdminDashboard = props => {

    if(localStorage.getItem('utype' !== 'admin'  )){
        return <Redirect to="/adminlogin"/>
    }

    return ( 
        <div>         
            <br />
            <AdminNav />
            <br />
            <br />
            <CardDeck>
                <Card>
                    <Card.Img variant="top" src="https://s27942.pcdn.co/wp-content/uploads/2017/10/Oxford-university-leaks-student-details.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >
                           <Link to="/addadmin"> <Button variant="primary">Add Administrators</Button></Link>
                        </div>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://image.freepik.com/free-photo/happy-teacher-with-students-background_1098-2917.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >

                            <Link to="/adminprofiledashboard"><Button variant="primary">View Profile</Button></Link>
                        </div>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://www.transglobeedu.com/wp-content/uploads/2019/03/Benefits-Students-get-with-Higher-Studies-in-Overseas.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >

                           <Link to="/addinstructor" ><Button variant="primary">Add Instructor</Button> </Link>
                        </div>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://www.transglobeedu.com/wp-content/uploads/2019/03/Benefits-Students-get-with-Higher-Studies-in-Overseas.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >

                           <Link to="/viewadmin" ><Button variant="primary">View Administrators</Button> </Link>
                        </div>
                    </Card.Body>
                </Card>
            </CardDeck>
        </div>
    );

}
AdminDashboard.propTypes = {

}


export default AdminDashboard;