import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditStudent extends Component {
    constructor(props){
        super(props);

        this.onChangeID= this.onChangeID.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeYear_Of_Batch = this.onChangeYear_Of_Batch.bind(this);
        this.onChangeCollege_ID = this.onChangeCollege_ID.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onChangeDate_Of_Birth = this.onChangeDate_Of_Birth.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            ID : '',
            Name : '',
            Year_Of_Batch : 0,
            College_ID: '',
            Skills: '',
            Date_Of_Birth : new Date(),
            IDs: [],
            colleges:[],
            college: [],
            id: '',
            currentid : '',
            students: []
        }

    }

    componentDidMount(){

        axios.get('http://3.129.146.55:5000/student/')
            .then(response => {
                this.setState({students: response.data})
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('http://3.129.146.55:5000/student/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    ID : response.data.ID,
                    Name : response.data.Name,
                    Year_Of_Batch : response.data.Year_Of_Batch,
                    College_ID: response.data.College_ID,
                    Skills: response.data.Skills,
                    Date_Of_Birth : new Date(response.data.Date_Of_Birth),
                })
            })
            .catch(function (error){
                console.log(error);
            })



        axios.get('http://3.129.146.55:5000/college/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        IDs: response.data.map(college => college.ID),
                        College_ID: response.data[0].ID,
                        colleges : response.data
                    })
                }
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
    onChangeYear_Of_Batch(e) {
        this.setState({
            Year_Of_Batch: e.target.value
        });
    }
    onChangeCollege_ID(e) {
        this.setState({
            College_ID: e.target.value
        });
    }
    onChangeSkills(e) {
        this.setState({
            Skills: e.target.value
        });
    }
    onChangeDate_Of_Birth(date) {
        this.setState({
            Date_Of_Birth: date
        });
    }

    onSubmit(e){
        e.preventDefault();

        const student = {
            ID: this.state.ID,
            Name: this.state.Name,
            Year_Of_Batch: this.state.Year_Of_Batch,
            College_ID: this.state.College_ID,
            Skills: this.state.Skills,
            Date_Of_Birth: this.state.Date_Of_Birth
        }

        if (this.state.colleges.length > 0){

            var current = this.state.colleges[Number(this.state.College_ID)-1];
            current.Number_Of_Students += 1;
    
            axios.post('http://3.129.146.55:5000/college/update/'+ this.state.colleges[Number(this.state.College_ID)-1]._id,current)
                .then(res => console.log(res.data))
                .catch((error) => {
                    console.log(error,'something');
                }) ; 
    
        }   
        var studentcollegeid = ''
        for (let s of this.state.students){
            if(s._id === this.props.match.params.id)
            {
                studentcollegeid = s.College_ID;
            }
        }       

        if (this.state.colleges.length > 0 && studentcollegeid !== ''){

            var current1 = this.state.colleges[Number(studentcollegeid)-1];
            current1.Number_Of_Students -= 1;
    
            axios.post('http://3.129.146.55:5000/college/update/'+ this.state.colleges[Number(studentcollegeid)-1]._id,current1)
                .then(res => console.log(res.data))
                .catch((error) => {
                    console.log(error,'something');
                }) ; 
    
            } 
        
        
        console.log(student);
        axios.post('http://3.129.146.55:5000/student/update/'+ this.props.match.params.id,student)
            .then(res => console.log(res.data));
        window.location = '/studentlist';
    }

    render(){
        return (
            <div>
                <h3>Edit Student Profile</h3>
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
                        <label>Year of Batch: </label>
                        <input type="number"
                            required
                            className="form-control"
                            value={this.state.Year_Of_Batch}
                            onChange={this.onChangeYear_Of_Batch}
                            />
                    </div>
                    <div className="form-group">
                        <label>College_ID: </label>
                        <select ref= "userInput"
                            required 
                            className = "form-control"
                            value = {this.state.College_ID}
                            onChange={this.onChangeCollege_ID}>
                            {
                                this.state.IDs.map(function(college){
                                    return <option 
                                        key ={college}
                                        value= {college}>{college}
                                        </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className ="form-group">
                        <label>Skills: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Skills}
                            onChange={this.onChangeSkills}
                            />
                    </div>

                    <div className ="form-group">
                        <label>Date Of Birth: </label>
                        <div>
                            <DatePicker
                                selected={this.state.Date_Of_Birth}
                                onChange={this.onChangeDate_Of_Birth}
                            />
                        </div>
                    </div>

                    <div className ="form-group">
                        <input type="submit"
                            value="Edit Student Profile"
                            className="btn btn-primary"
                            />
                    </div>               
                </form>     
            </div>
        )
    }
}