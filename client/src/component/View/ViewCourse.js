import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';




const Course = props => (
    <tr>
        <td>{props.courses.coursename}</td>
        <td>{props.courses.faculty}</td>
        <td>{props.courses.status}</td>
        <td>{props.courses.enrollmentKey}</td>
        <td>{props.courses.courseCredits}</td>


    </tr>
)


class ViewCourse extends Component {
    constructor(props) {
        super(props)

        this.state = {
            courses: []
        };
    }
    componentDidMount() {
        axios.get('/api/course')
            .then(response => {
                this.setState({
                    courses: response.data
                })
            })
            .catch(err => {
                if (err) {
                    console.log(err)
                }
            })
    }

    CourseList() {
        return this.state.courses.map(function (currentCourse, i) {
            return <Course courses={currentCourse} key={i} />
        })
    }

    render() {
        return (
            <div>
                <br/>
                <Link to="/studentdashboard"><button type="button" class="btn btn-secondary btn-sm" >Go to Previous Page</button></Link>

                <div>
                    <h3>Course List</h3>
                    <table className="table table-striped" >
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Faculty</th>
                                <th>Status</th>
                                <th>Enrollment Key</th>
                                <th>Course Credits</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.CourseList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ViewCourse;