import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, NavItem } from 'react-bootstrap';


class StudentNav extends Component{
    render(){
        return(
            <div>
             <Navbar fill bg="dark" variant="dark" class="navbar-nav nav-fill w-100" >
                <Navbar.Brand href="#home">Student Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Support Services" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/viewCourse">Courses</NavDropdown.Item>
                            <NavDropdown.Item href="/viewInstructor">Instructors</NavDropdown.Item>
                            <NavDropdown.Item href="/ViewAssignment">Assignments</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Academic Services" id="basic-nav-dropdown">
                            <NavDropdown.Item href="https://www.netacad.com/login/">Cisco Network Academy</NavDropdown.Item>
                            <NavDropdown.Item href="https://turnitin.com/login_page.asp?lang=en_us">Turnitin</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Email" id="basic-nav-dropdown">
                            <NavDropdown.Item href="https://www.office.com/">Microsoft O365</NavDropdown.Item>
                            <NavDropdown.Item href="https://www.google.com/intl/en-GB/gmail/about/#">Gmail</NavDropdown.Item>
                        </NavDropdown>
                        <NavItem>
                            <Nav.Link href="">My Courses</Nav.Link>
                        </NavItem>
                    </Nav>
                    <Nav fa-pull-right>
                        <NavItem>
                            <Nav.Link href="">Notifications</Nav.Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
        );
    }
}

export default StudentNav;