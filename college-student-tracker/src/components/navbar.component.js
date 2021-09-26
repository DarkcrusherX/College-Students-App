import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                {/* <Link to="/" className="navbar-brand">Student-College</Link> */}
                <div className="collapse navbar-collapse" style={{justifyContent:'center', alignItems:'center'}}>
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                    <Link to="/" className="navbar-brand">College List</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/studentlist" className="navbar-brand">Student List</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/createcollege" className="navbar-brand">Create College Profile</Link>
                    </li>  
                    <li className="navbar-item">
                    <Link to="/createstudent" className="navbar-brand">Create Student Profile</Link>
                    </li>                  
                </ul>
                </div>
            </nav>
        );
    };
}