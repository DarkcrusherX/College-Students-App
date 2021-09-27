import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import SearchFeature from './SearchFeature';
import {Button} from '@mui/material';
const Student = props => (
    <tr>
        <td>{props.student.ID}</td>
        <td>{props.student.Name}</td>
        <td>{props.student.Year_Of_Batch}</td>
        <td>{props.student.College_ID}</td>
        <td>{props.student.Skills}</td>
        <td>{props.student.Date_Of_Birth.substring(0,10)}</td>
        <td>
            <Link to={"/editstudent/"+ props.student._id}><Button variant="contained" color="success">Edit</Button></Link> | <Button variant="contained" color="error" onClick={() => {props.deleteStudent(props.student._id)}}>Delete</Button>
        </td>
    </tr>
)

export default class StudentList extends Component {

    constructor(props){
        super(props);

        this.deleteStudent = this.deleteStudent.bind(this);
        this.state = {students: [] , studentscopy: [] , colleges: []};
        this.updateSearch = this.updateSearch.bind(this);

    }
    componentDidMount(){
        axios.get('http://3.129.146.55:5000/student/')
            .then(response => {
                this.setState({students: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
        axios.get('http://3.129.146.55:5000/college/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    colleges : response.data
                })
            }
        })
    }

    deleteStudent(id){
        var collegeid = '';
        for (let item of this.state.students){
            if(item._id === id){
                collegeid = item.College_ID;
            }
        }


        if (this.state.colleges.length > 0){

            var current = this.state.colleges[Number(collegeid)-1];
            console.log(current,Number(collegeid)-1,collegeid);
            current.Number_Of_Students -= 1;
    
            axios.post('http://3.129.146.55:5000/college/update/'+ this.state.colleges[Number(collegeid)-1]._id,current)
                .then(res => console.log(res.data))
                .catch((error) => {
                    console.log(error,'something');
                }) ; 
    
        }  

        axios.delete('http://3.129.146.55:5000/student/'+id)
            .then(res => console.log(res.data));
        this.setState({
            students: this.state.students.filter(el => el._id !== id)
        })
    }

    updateSearch(SearchVar){
        axios.get('http://3.129.146.55:5000/student/')
            .then(response => {
                this.setState({studentscopy: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
        this.setState({
            students: this.state.studentscopy.filter(el => (el.ID.toLowerCase().includes(SearchVar.toLowerCase()) || el.Name.toLowerCase().includes(SearchVar.toLowerCase()) 
            || el.Year_Of_Batch.toString().trim().toLowerCase().includes(SearchVar.toLowerCase()) || el.College_ID.toLowerCase().includes(SearchVar.toLowerCase()) || el.Skills.toLowerCase().includes(SearchVar.toLowerCase())))
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
                <h1 id="h1" align="center" >Student List</h1>
                <h4>Enter the keyword to classify students based on any feature.........</h4>  
                <SearchFeature placeholder="Search Any Attribute Here......" handleChange = {(e) => this.updateSearch(e.target.value)} />
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