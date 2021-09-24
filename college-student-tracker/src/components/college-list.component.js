import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const College = props => (
    <tr>
        <td>{props.college.ID}</td>
        <td>{props.college.Name}</td>
        <td>{props.college.Year_Founded}</td>
        <td>{props.college.City}</td>
        <td>{props.college.State}</td>
        <td>{props.college.Country}</td>
        <td>{props.college.Number_Of_Students}</td>
        <td>{props.college.Courses}</td>

        <td>
            <Link to={"/editcollege/"+ props.college._id}><button type="button">edit</button></Link> | <button onClick={() => {props.deleteCollege(props.college._id)}}>delete</button>
        </td>
    </tr>
)

export default class CollegeList extends Component {

    constructor(props){
        super(props);

        this.deleteCollege = this.deleteCollege.bind(this);
        this.state = {Colleges: []};

    }
    componentDidMount(){
        axios.get('http://localhost:5000/college/')
            .then(response => {
                this.setState({Colleges: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteCollege(id){
        axios.delete('http://localhost:5000/college/'+id)
            .then(res => console.log(res.data));
        this.setState({
            Colleges: this.state.Colleges.filter(el => el._id !== id)
        })
    }

    CollegeList(){
        return this.state.Colleges.map(currentCollege => {
            return <College college= {currentCollege} deleteCollege = {this.deleteCollege} key = {currentCollege._id}/>;
        })
    }

    render(){
        return (
            <div>
                <h3>college List</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Year Founded</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Country</th>
                            <th>Number of Students</th>
                            <th>Courses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.CollegeList()}
                    </tbody>
                </table>
            </div>
        )
    }
}