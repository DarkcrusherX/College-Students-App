import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateCollege extends Component {
    constructor(props){
        super(props);

        this.onChangeID= this.onChangeID.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeYear_Founded = this.onChangeYear_Founded.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
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
            students: [],
        }

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
    onChangeCourses(e) {
        this.setState({
            Courses: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        axios.get('http://3.129.146.55:5000/student/')
            .then(response => {
                this.setState({students: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
        var nostudents = 0;
        for (let item of this.state.students){
            if(item.College_ID === this.state.ID){
                nostudents += 1;
            }
        }

        const college = {
            ID: this.state.ID,
            Name: this.state.Name,
            Year_Founded: this.state.Year_Founded,
            City: this.state.City,
            State: this.state.State,
            Country: this.state.Country,
            Number_Of_Students: nostudents,
            Courses: this.state.Courses
        }
        
        console.log(college);
        axios.post('http://3.129.146.55:5000/college/add/',college)
            .then(res => console.log(res.data));
        window.location = '/';
    }

    render(){
        return (
            <div>
                <h3>Create College Profile</h3>
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
                            value="Create College Profile"
                            className="btn btn-primary"
                            />
                    </div>                    
                </form>     
            </div>
        )
    }
}