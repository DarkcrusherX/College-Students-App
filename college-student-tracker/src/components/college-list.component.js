import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import SearchFeature from './SearchFeature';
import SearchCollege from './SearchCollege';

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
        this.state = {Colleges: [], Collegescopy: []};
        this.updateSearch = this.updateSearch.bind(this);
        this.Feature = '';
        this.AttributeSearch = '';
        this.GraphData = this.GraphData.bind(this);
        this.FindSimilarCollege = this.FindSimilarCollege.bind(this);
    
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
    updateSearch(SearchVar){



        axios.get('http://localhost:5000/college/')
            .then(response => {
                this.setState({Collegescopy: response.data})
            })
            .catch((error) => {
                console.log(error);
            })

        this.AttributeSearch = SearchVar;
        this.setState({
            Colleges: this.state.Collegescopy.filter(el => (el.ID.toLowerCase().includes(SearchVar.toLowerCase()) || el.Name.toLowerCase().includes(SearchVar.toLowerCase()) 
            || el.Year_Founded.toString().trim().toLowerCase().includes(SearchVar.toLowerCase()) || el.City.toLowerCase().includes(SearchVar.toLowerCase()) || el.State.toLowerCase().includes(SearchVar.toLowerCase()) ||
            el.Country.toLowerCase().includes(SearchVar.toLowerCase()) || el.Number_Of_Students.toString().trim().toLowerCase().includes(SearchVar.toLowerCase())
            || el.Courses.toLowerCase().includes(SearchVar.toLowerCase())) )
        })
    }

    FindSimilarCollege(collegename){

        axios.get('http://localhost:5000/college/')
            .then(response => {
                this.setState({Collegescopy: response.data})
            })
            .catch((error) => {
                console.log(error);
            })

        var flag = 0;
        for (let item of this.state.Collegescopy){
            if( item.Name.toString().trim() === collegename){
                var TheCollege = item;
                flag = 1;
            }
        }
        if(flag === 1){
            const SearchVar = this.AttributeSearch;
            if (SearchVar !== ''){

            this.setState({
                Collegescopy: this.state.Collegescopy.filter(el => (el.ID.toLowerCase().includes(SearchVar.toLowerCase()) || el.Name.toLowerCase().includes(SearchVar.toLowerCase()) 
                || el.Year_Founded.toString().trim().toLowerCase().includes(SearchVar.toLowerCase()) || el.City.toLowerCase().includes(SearchVar.toLowerCase()) || el.State.toLowerCase().includes(SearchVar.toLowerCase()) ||
                el.Country.toLowerCase().includes(SearchVar.toLowerCase()) || el.Number_Of_Students.toString().trim().toLowerCase().includes(SearchVar.toLowerCase())
                || el.Courses.toLowerCase().includes(SearchVar.toLowerCase())) )
            })

            }
            if (this.Feature !== ""){
                if(this.Feature === "ID")
                {
                    this.setState({
                        Colleges: this.state.Collegescopy.filter(el => (el.ID === TheCollege.ID))
                    })
                }
                else if(this.Feature === "Name"){
                    this.setState({
                        Colleges: this.state.Collegescopy.filter(el => (el.Name === TheCollege.Name))
                    })                   
                }
                else if(this.Feature === "City"){
                    this.setState({
                        Colleges: this.state.Collegescopy.filter(el => (el.City === TheCollege.City))
                    })                       
                }
                else if(this.Feature === "State"){
                    this.setState({
                        Colleges: this.state.Collegescopy.filter(el => (el.State === TheCollege.State))
                    })                       
                }
                else if(this.Feature === "Year_Founded"){
                    this.setState({
                        Colleges: this.state.Collegescopy.filter(el => ( el.Year_Founded.toString().trim() === TheCollege.Year_Founded.toString().trim()))
                    })                        
                }
                else if(this.Feature === "Number_Of_Students"){

                    this.setState({
                        Colleges: this.state.Collegescopy.filter(el => ( Math.abs(el.Number_Of_Students - TheCollege.Number_Of_Students) < 100 ))
                    })                        
                }
                else if(this.Feature === "Courses") {
                    this.setState({
                        Colleges: this.state.Collegescopy.filter(el => ( el.Courses.toLowerCase().includes(TheCollege.Courses.toLowerCase()) ))
                    })                    
                }              

            }


        flag = 0;
        }
     
    }

    CollegeList(){
        return this.state.Colleges.map(currentCollege => {
            return <College college= {currentCollege} deleteCollege = {this.deleteCollege} key = {currentCollege._id}/>;
        })
    }

    render(){

        return (
            <div>
                <h3>College List</h3>
                <SearchFeature placeholder="Search Any Attribute Here......" handleChange = {(e) => this.updateSearch(e.target.value)} />
                <select class="selectpicker" onChange = {(e) => this.Feature = e.target.value} data-style="btn-info" name="selectpicker">
                <optgroup label="Select Feature">

                    <option name="ID" value="ID">ID</option>
                    <option name="Name" value="Name">Name</option>
                    <option name="Year Founded" value="Year_Founded">Year Founded</option>
                    <option name="City" value="City">City</option>
                    <option name="State" value="State">State</option>
                    <option name="Country" value="Country">Country</option>
                    <option name="Number of Students" value="Number_Of_Students">Number of Students</option>
                    <option name="Courses" value="Courses">Courses</option>
                </optgroup>
                 </select>
                <SearchCollege placeholder="Enter College Name..." SimilarCollege = {(e) => this.FindSimilarCollege(e.target.value)} />
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
                <h3>Pie Charts</h3>
                    <select class="selectpicker" onChange = {(e) => this.GraphData(e.target.value)} data-style="btn-info" name="selectpicker">
                        <optgroup label="Select Feature">
                            <option name="" value="">Select Feature</option>
                            <option name="Year Founded" value="Year_Founded">Year Founded</option>
                            <option name="City" value="City">City</option>
                            <option name="State" value="State">State</option>
                            <option name="Country" value="Country">Country</option>
                            <option name="Number of Students" value="Number_Of_Students">Number of Students</option>
                            <option name="Courses" value="Courses">Courses</option>
                        </optgroup>
                    </select>  
                             
            </div>
        )
    }
}