import React, { Component } from 'react';
import { Card, Button, CardDeck } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (<div>
      <br />
      <br />
      <br />
      <br />
      <CardDeck>
                <Card>
                    <Card.Img variant="top" src="https://s27942.pcdn.co/wp-content/uploads/2017/10/Oxford-university-leaks-student-details.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >
                           <Link to="/login"> <Button variant="primary">Login</Button></Link>
                        </div>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://image.freepik.com/free-photo/happy-teacher-with-students-background_1098-2917.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >

                          <Link to="/register">  <Button variant="primary">Sign Up</Button></Link>
                        </div>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src="https://www.transglobeedu.com/wp-content/uploads/2019/03/Benefits-Students-get-with-Higher-Studies-in-Overseas.jpg" />
                    <Card.Body>
                        <div class="row justify-content-center" >

                           <Link to="/about" ><Button variant="primary">About Us</Button> </Link>
                        </div>
                    </Card.Body>
                </Card>
            </CardDeck>
    </div>

    );
  }
}

export default Landing;