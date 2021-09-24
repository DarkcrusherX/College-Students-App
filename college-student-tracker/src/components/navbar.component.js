import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Student-College</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                    <Link to="/" className="nav-link">Student List</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/collegelist" className="nav-link">College List</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/createstudent" className="nav-link">Create Student Profile</Link>
                    </li>  
                    <li className="navbar-item">
                    <Link to="/createcollege" className="nav-link">Create College Profile</Link>
                    </li>                  
                </ul>
                </div>
            </nav>
        );
    };
}