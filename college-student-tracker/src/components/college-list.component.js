import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import SearchFeature from './SearchFeature';
import SearchCollege from './SearchCollege';
import { Pie } from 'react-chartjs-2';
import {Button} from '@mui/material';

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
            <Link to={"/editcollege/"+ props.college._id}><Button variant="contained" color="success" >Edit</Button></Link> | <Button variant="contained" color="error" onClick={() => {props.deleteCollege(props.college._id)}}>Delete</Button>
        </td>
    </tr>
)

export default class CollegeList extends Component {

    constructor(props){
        super(props);

        this.deleteCollege = this.deleteCollege.bind(this);
        this.state = {Colleges: [], Collegescopy: [], forgraph: [] , GraphDatavals: []};
        this.updateSearch = this.updateSearch.bind(this);
        this.Feature = '';
        this.AttributeSearch = '';
        this.GraphData = this.GraphData.bind(this);
        this.FindSimilarCollege = this.FindSimilarCollege.bind(this);
        this.labels = [];
        this.data = [];
        this.GraphClick = this.GraphClick.bind(this);
        this.element = 0;
    
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

    GraphData(target){

        // axios.get('http://localhost:5000/college/')
        //     .then(response => {
        //         this.setState({forgraph: response.data})
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
        const backgroundcolor=  ['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)'];
        const bordercolor=  ['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)'];
        this.data = [];
        this.labels = [];
        var index = 0;
        for (let item of this.state.Colleges){
            if(target === "City"){
                if(this.labels.includes(item.City)){
                    index = this.labels.indexOf(item.City);
                    this.data[index] += 1;
                }
                else{
                    this.labels.push(item.City);
                    this.data.push(1);
                }
            }  
            else if(target === "State"){
                if(this.labels.includes(item.State)){
                    index = this.labels.indexOf(item.State);
                    this.data[index] += 1;
                }
                else{
                    this.labels.push(item.State);
                    this.data.push(1);
                }
            }
            else if(target === "Country"){
                if(this.labels.includes(item.Country)){
                    index = this.labels.indexOf(item.Country);
                    this.data[index] += 1;
                }
                else{
                    this.labels.push(item.Country);
                    this.data.push(1);
                }
            }
            else if(target === "Year_Founded"){
                if(this.labels.includes(item.Year_Founded)){
                    index = this.labels.indexOf(item.Year_Founded);
                    this.data[index] += 1;
                }
                else{
                    this.labels.push(item.Year_Founded);
                    this.data.push(1);
                }
            }
            else if(target === "Courses"){
                var courseworks = item.Courses.toString().toLowerCase().trim().split(',');
                for (let c of courseworks){
                    if(this.labels.includes(c.trim())){
                        index = this.labels.indexOf(c.trim());
                        this.data[index] += 1;
                    }
                    else{
                        this.labels.push(c.trim());
                        this.data.push(1);
                    }
                }
            }
      
        }

        this.setState({GraphDatavals: { labels: this.labels , datasets:[{ label: 'Chart', data: this.data, backgroundColor:backgroundcolor, borderColor: bordercolor}]}});

    }

    GraphClick(e){
        this.updateSearch(this.labels[e].toString().trim().toLowerCase());
    }

    CollegeList(){
        return this.state.Colleges.map(currentCollege => {
            return <College college= {currentCollege} deleteCollege = {this.deleteCollege} key = {currentCollege._id}/>;
        })
    }

    render(){

        return (
            <div style={{justifyContent:'center', alignItems:'center', backgroundColor: "#fd91aa 30%, #fc9f6d 80%"}}>

                <h1 id="h1" align="center" >College List</h1>
                <h4>Enter the keyword to classify colleges based on any feature.........</h4>            
                <SearchFeature placeholder="Search Any Attribute Here......" handleChange = {(e) => this.updateSearch(e.target.value)} />
                <h4>Select a feature and enter a college name to get colleges similar to it..........</h4>  
                <select className="selectpicker" onChange = {(e) => this.Feature = e.target.value} data-style="btn-info" name="selectpicker">  
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
                <SearchCollege fullWidth placeholder="Enter College Name..." maxLength={1000} style={{ position: 'absolute', right: 5}} SimilarCollege = {(e) => this.FindSimilarCollege(e.target.value)} />
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
                <h1 id="h1" align="center">PieChart</h1>
                <h4>Select the feature you need to plot the PieChart on........</h4>
                    <select className="selectpicker" onChange = {(e) => this.GraphData(e.target.value)} data-style="btn-info" name="selectpicker">
                        <optgroup label="Select Feature">
                            <option name="" value="">Select Feature</option>
                            <option name="Year Founded" value="Year_Founded">Year Founded</option>
                            <option name="City" value="City">City</option>
                            <option name="State" value="State">State</option>
                            <option name="Country" value="Country">Country</option>
                            <option name="Courses" value="Courses">Courses</option>
                        </optgroup>
                    </select>  
                <h6>Double Click on the slice to see all the colleges belonging to it........</h6>  
                <Pie 
                    data = {this.state.GraphDatavals}
                    options ={{onClick: (e,element) => { if(element.length>0){this.GraphClick(element[0].index)}} , responsive: true,
                    maintainAspectRatio: true  }}
                    width= {30}
                    />           
                
            </div>
        )
    }
}
