import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import StudentList from "./components/student-list.component";
import CollegeList from "./components/college-list.component";
import EditStudent from "./components/edit-student.component";
import EditCollege from "./components/edit-college.component";
import CreateStudent from "./components/create-student.component";
import CreateCollege from "./components/create-college.component";
// import './App.css';

import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    height: "100vh",
    background: "linear-gradient(45deg, #fd91aa 30%, #fc9f6d 80%)",
    alignItems: 'center',
    justifyContent:"center"
  }
});




function App() {
  const classes = useStyles();
  return (
    <Router> 
      <div className="container">
        <Navbar/>
        <br/>
        <Route path= "/" exact component={CollegeList} />
        <Route path= "/studentlist" exact component={StudentList} />
        <Route path= "/editstudent/:id" component={EditStudent} />
        <Route path= "/editcollege/:id" component={EditCollege} />
        <Route path= "/createcollege" component={CreateCollege} />
        <Route path= "/createstudent" component={CreateStudent} />
      </div>
    </Router>
  );
}

export default App;
