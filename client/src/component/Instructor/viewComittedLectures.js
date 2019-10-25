import React, { Component } from 'react';
import { Table, Form, FormControl, Button } from 'react-bootstrap'
import {Link , Redirect} from 'react-router-dom';
import axios from 'axios';

const Lectures = props => (<tr>
                            <td>{props.lecture.lectureName}</td>
                            <td>{props.lecture.comittedUrl}</td>
        </tr>
)

class viewComittedLectres extends Component {
    constructor(props){
        super(props);

        this.state ={
            lectures : [],
        };
    }
    componentDidMount(){
        
        console.log('charr ',this.props.course)
        axios.get(`/api/lecture/${this.props.course}`)
        .then((response) => {
            console.log(response)
            this.setState({
                lectures:response.data
            });
            
        console.log('log ',this.state.lectures)
        })
        .catch(err =>{
            if(err){
                console.log(err)
            }
        });
    }
    
    lectureList(){
        return this.state.lectures.map(function(current, i){
            return <Lectures lecture={current} key={i}/>
        })
    }
        
    

    render() {
        return (
            <div>
                <br/>
                <br/>

                <h1 className="large text-primary">Lectures</h1>


                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Lecture Name</th>
                            <th>Commited Url</th>
                        </tr>
                    </thead>
                    <tbody>
                            {this.lectureList()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default viewComittedLectres;
