import React from "react";
import {Link, NavLink} from 'react-router-dom';
import {auth} from '../firebase'
import { withRouter } from "react-router-dom"; 
import '../App.css';

const Navbar = (props) => {

    const cerrarSesion = () =>{
        auth.signOut().then(() =>{
            props.history.push('/login')
        })
    }

    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand"><i className="gg-home-alt"></i></Link>
                    <div className="d-flex">
                        <NavLink className="btn btn-light btn-sm mr-4 me-2" to="/" exact>Inicio</NavLink>
                        {
                            props.firebaseUser !== null ? (
                                <NavLink className="btn btn-light btn-sm mr-4 me-2" to="/admin">
                                    Admin
                                </NavLink>
                            ) : null 
                        }
                        {
                            props.firebaseUser !== null ? (
                                <button className="btn btn-light btn-sm mr-4" onClick={() => cerrarSesion()}>
                                    Logout
                                </button>
                            ) : (
                                <NavLink className="btn btn-light btn-sm mr-4" to="/login">
                                    Login
                                </NavLink>
                            )
                        }
                    </div>
            </div>
        </div>
    )
}

export default withRouter (Navbar)