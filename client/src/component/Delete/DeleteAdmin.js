import React, { Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';




export default class DeleteAdmin extends Component {

    constructor(props) {
        super(props);

        
        this.onSubmit = this.onSubmit.bind(this);

       
    }

    
    onSubmit(e) {
        e.preventDefault();
        
       
        axios.delete('/api/admin/'+this.props.match.params.id)
            .then(response =>{
                alert("Admin Deleted!");
                this.props.history.push('/viewadmin');
            })
        
        
    }

    render() {
        return (
            <div>
                <br/>
                <Link to ="/AdminDashboard"><button type="button" class="btn btn-secondary btn-sm" >Go to Previous Page</button></Link>
                <h3 align="center">Are you Sure ?</h3>
                <form onSubmit={this.onSubmit}>
                    
                    <div className="form-group">
                        <input type="submit" value="Yes" className="btn btn-primary" />
                        <Link to="/viewadmin"><Button type="button" className="btn btn-danger">No</Button></Link>
                    </div>
                </form>
            </div>
        )
    }
}


