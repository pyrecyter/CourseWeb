import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';




const Admin = props => (
    <tr>
        <td>{props.admins.firstname}</td>
        <td>{props.admins.lastname}</td>
        <td>{props.admins.email}</td>


        <td>
            <Link to={"/delete/" + props.admins._id}>Delete</Link>
        </td>
    </tr>
)


class Admins extends Component {
    constructor(props) {
        super(props)

        this.state = {
            admins: []
        };
    }
    componentDidMount() {
        axios.get('/api/admin')
            .then(response => {
                this.setState({
                    admins: response.data
                })
            })
            .catch(err => {
                if (err) {
                    console.log(err)
                }
            })
    }

    AdminList() {
        return this.state.admins.map(function (currentAdmin, i) {
            return <Admin admins={currentAdmin} key={i} />
        })
    }

    render() {
        return (
            <div>
                <br/>
                <Link to="/AdminDashboard"><button type="button" class="btn btn-secondary btn-sm" >Go to Previous Page</button></Link>

                <div>
                    <h3>Admin List</h3>
                    <table className="table table-striped" >
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.AdminList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Admins;