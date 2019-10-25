import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';




const Instructor = props => (
    <tr>
        <td>{props.instructors.firstname}</td>
        <td>{props.instructors.lastname}</td>
        <td>{props.instructors.email}</td>
        <td>{props.instructors.course}</td>
    </tr>
)


class ViewInstructor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            instructors: []
        };
    }
    componentDidMount() {
        axios.get('/api/instructor')
            .then(response => {
                this.setState({
                    instructors: response.data
                })
            })
            .catch(err => {
                if (err) {
                    console.log(err)
                }
            })
    }

    InstructorList() {
        return this.state.instructors.map(function (currentInstructor, i) {
            return <Instructor instructors={currentInstructor} key={i} />
        })
    }

    render() {
        return (
            <div>
                <br/>
                <Link to="/studentdashboard"><button type="button" class="btn btn-secondary btn-sm" >Go to Previous Page</button></Link>

                <div>
                    <h3>Instructor List</h3>
                    <table className="table table-striped" >
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Course</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.InstructorList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ViewInstructor;