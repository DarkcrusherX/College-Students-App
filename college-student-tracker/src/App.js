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
import './App.css';

// style ={ { backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/back_our/20190625/ourmid/pngtree-pink-yellow-parallel-twill-background-image_262471.jpg')"}}
function App() {
  return (
    <Router> 
      <div>
      <div className="container">
        <img src="/classroom.jpg" alt="classroom" className="classroom"/>
        <img src="/studying.jpg" alt="studying" className="classroom"/>
        <img src="/girl.jpg" alt="girl" className="classroom"/>
        <img src="/handsup.jpg" alt="handsup" className="classroom"/>

        <Navbar/>
        <br/>
        <Route path= "/" exact component={CollegeList} />
        <Route path= "/studentlist" exact component={StudentList} />
        <Route path= "/editstudent/:id" component={EditStudent} />
        <Route path= "/editcollege/:id" component={EditCollege} />
        <Route path= "/createcollege" component={CreateCollege} />
        <Route path= "/createstudent" component={CreateStudent} />
      </div>
      </div>
    </Router>
  );
}

export default App;
