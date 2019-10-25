import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';




const AssignmentName = props => (
    <tr>
        <td>{props.assignments.assignmentName}</td>
        <td>{props.assignments.dueDate}</td>  

        
        <td>
            <Link to={"/assignment/delete/" + props.admins._id}>Delete</Link>
        </td>     
    </tr>
)


class Assignments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            assignments: []
        };
    }
    componentDidMount() {
        axios.get('/api/assignment')
            .then(response => {
                this.setState({
                    assignments: response.data
                })
            })
            .catch(err => {
                if (err) {
                    console.log(err)
                }
            })
    }

    AssignmentList() {
        return this.state.assignments.map(function (currentAssignment, i) {
            return <AssignmentName assignments={currentAssignment} key={i} />
        })
    }

    render() {
        return (
            <div>
                <br/>
                <Link to="/studentdashboard"><button type="button" class="btn btn-secondary btn-sm" >Go to Previous Page</button></Link>

                <div>
                    <h3>Assignment List</h3>
                    <table className="table table-striped" >
                        <thead>
                            <tr>
                                <th>Assignment Name</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.AssignmentList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Assignments;