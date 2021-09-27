import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class EditCollege extends Component {
    constructor(props){
        super(props);

        this.onChangeID= this.onChangeID.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeYear_Founded = this.onChangeYear_Founded.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeNumber_Of_Students = this.onChangeNumber_Of_Students.bind(this);
        this.onChangeCourses = this.onChangeCourses.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            ID : '',
            Name : '',
            Year_Founded : 0,
            City: '',
            State: '',
            Country: '',
            Number_Of_Students: 0,
            Courses: '',
        }

    }

    componentDidMount(){
        axios.get('http://3.129.146.55:5000/college/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    ID : response.data.ID,
                    Name : response.data.Name,
                    Year_Founded : response.data.Year_Founded,
                    City: response.data.City,
                    State: response.data.State,
                    Country: response.data.Country,
                    Number_Of_Students: response.data.Number_Of_Students,
                    Courses: response.data.Courses,
                })
            })
            .catch(function (error){
                console.log(error);
            })
    }

    onChangeID(e) {
        this.setState({
            ID: e.target.value
        });
    }
    onChangeName(e) {
        this.setState({
            Name: e.target.value
        });
    }
    onChangeYear_Founded(e) {
        this.setState({
            Year_Founded: e.target.value
        });
    }
    onChangeCity(e) {
        this.setState({
            City: e.target.value
        });
    }
    onChangeState(e) {
        this.setState({
            State: e.target.value
        });
    }
    onChangeCountry(e) {
        this.setState({
            Country: e.target.value
        });
    }
    onChangeNumber_Of_Students(e) {
        this.setState({
            Number_Of_Students: e.target.value
        });
    }
    onChangeCourses(e) {
        this.setState({
            Courses: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const college = {
            ID: this.state.ID,
            Name: this.state.Name,
            Year_Founded: this.state.Year_Founded,
            City: this.state.City,
            State: this.state.State,
            Country: this.state.Country,
            Number_Of_Students: this.state.Number_Of_Students,
            Courses: this.state.Courses
        }
        
        
        console.log(college);
        axios.post('http://3.129.146.55:5000/college/update/'+ this.props.match.params.id,college)
            .then(res => console.log(res.data));
        window.location = '/';
    }

    render(){
        return (
            <div>
                <h3>Edit College Profile</h3>
                <form onSubmit={this.onSubmit}>

                <div className ="form-group">
                        <label>ID: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.ID}
                            onChange={this.onChangeID}
                            />
                    </div>
                    <div className ="form-group">
                        <label>Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Name}
                            onChange={this.onChangeName}
                            />
                    </div>
                    <div className ="form-group">
                        <label>Year_Founded: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Year_Founded}
                            onChange={this.onChangeYear_Founded}
                            />
                    </div>
                    <div className="form-group">
                        <label>City: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.City}
                            onChange={this.onChangeCity}
                            />
                    </div>

                    <div className ="form-group">
                        <label>State: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.State}
                            onChange={this.onChangeState}
                            />
                    </div>
                    <div className ="form-group">
                        <label>Country: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Country}
                            onChange={this.onChangeCountry}
                            />
                    </div>
                    <div className ="form-group">
                        <label>Number Of Students: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Number_Of_Students}
                            onChange={this.onChangeNumber_Of_Students}
                            />
                    </div>
                    <div className ="form-group">
                        <label>Courses: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Courses}
                            onChange={this.onChangeCourses}
                            />
                    </div>

                    <div className ="form-group">
                        <input type="submit"
                            value="Edit College Profile"
                            className="btn btn-primary"
                            />
                    </div>              
                </form>     
            </div>
        )
    }
}