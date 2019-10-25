import React, { Component } from 'react';
import { Table, Form, FormControl, Button } from 'react-bootstrap'
import {Link , Redirect} from 'react-router-dom';
import axios from 'axios';

const Assignment = props => (<tr>
                            <td>{props.assignment.assignmentName}</td>
                            <td>{props.assignment.dueDate.slice(0,10)}</td>
                            <td>{props.assignment.comittedUrl}</td>
                            <td>{props.assignment.modifiedDate}</td>
                            <td>{props.assignment.marks}</td>
                            <td>
                                <Form inline>
                                    <FormControl type="number" placeholder="marks" className="mr-sm-2" />
                                    <Button variant="outline-success" >Submit Marks</Button>
                                </Form>
                            </td>
        </tr>
)

class viewCompletedAssignment extends Component {
    constructor(props){
        super(props);

        this.state ={
            assignments : [],
        };
        this.setmarks=this.setmarks.bind(this)
    }
    setmarks(props){

    }
    componentDidMount(){
        
        axios.get(`/api/assignment/course/${this.props.course}`)
        .then((response) => {
            console.log(response)
            this.setState({
                assignments:response.data
            });
            
        })
        .catch(err =>{
            if(err){
                console.log(err)
            }
        });
    }
    
    assignmentList(){
        return this.state.assignments.map(function(current, i){
            return <Assignment assignment={current} key={i}/>
        })
    }
        
    

    render() {
        return (
            <div>
                <br/>
                <Link to="/instructordashboard"><button type="button" class="btn btn-secondary btn-sm" >Go to Previous Page</button></Link>

                <br/>

                <h1 className="large text-primary">Assignments</h1>


                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Assignment Name</th>
                            <th>Due Date</th>
                            <th>Commited Url</th>
                            <th>Modified Date</th>
                            <th>Allocated Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                            {this.assignmentList()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default viewCompletedAssignment;
