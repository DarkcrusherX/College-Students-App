import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Student = props => (
    <tr>
        <td>{props.student.ID}</td>
        <td>{props.student.Name}</td>
        <td>{props.student.Year_Of_Batch}</td>
        <td>{props.student.College_ID}</td>
        <td>{props.student.Skills}</td>
        <td>{props.student.Date_Of_Birth.substring(0,10)}</td>
        <td>
            <Link to={"/editstudent/"+ props.student._id}><button type="button">edit</button></Link> | <button onClick={() => {props.deleteStudent(props.student._id)}}>delete</button>
        </td>
    </tr>
)

export default class StudentList extends Component {

    constructor(props){
        super(props);

        this.deleteStudent = this.deleteStudent.bind(this);
        this.state = {students: []};

    }
    componentDidMount(){
        axios.get('http://localhost:5000/student/')
            .then(response => {
                this.setState({students: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteStudent(id){
        axios.delete('http://localhost:5000/student/'+id)
            .then(res => console.log(res.data));
        this.setState({
            students: this.state.students.filter(el => el._id !== id)
        })
    }

    StudentList(){
        return this.state.students.map(currentstudent => {
            return <Student student= {currentstudent} deleteStudent = {this.deleteStudent} key = {currentstudent._id}/>;
        })
    }

    render(){
        return (
            <div>
                <h3>Student List</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Year Of Batch</th>
                            <th>College ID</th>
                            <th>Skills</th>
                            <th>Date Of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.StudentList()}
                    </tbody>
                </table>
            </div>
        )
    }
}