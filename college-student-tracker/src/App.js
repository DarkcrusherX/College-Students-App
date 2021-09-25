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


function App() {
  return (
    <Router> 
      <div className="container">
        <Navbar/>
        <br/>
        <Route path= "/studentlist" exact component={StudentList} />
        <Route path= "/collegelist" exact component={CollegeList} />
        <Route path= "/editstudent/:id" component={EditStudent} />
        <Route path= "/editcollege/:id" component={EditCollege} />
        <Route path= "/createstudent" component={CreateStudent} />
        <Route path= "/createcollege" component={CreateCollege} />
      </div>
    </Router>
  );
}

export default App;
