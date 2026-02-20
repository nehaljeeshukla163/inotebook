import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    let history = useNavigate();
    let location = useLocation();

    const handlelogout = () => {
        localStorage.removeItem('token');
        history('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>

                    {!localStorage.getItem('token') ? (
                        <form className="d-flex">
                            <Link className="btn btn-primary mx-1" to="/login">Login</Link>
                            <Link className="btn btn-primary mx-1" to="/signup">Signup</Link>
                        </form>
                    ) : (
                         <div className="d-flex align-items-center text-white">
                            <span className="me-3">
                                Welcome, {localStorage.getItem('name')}
                            </span>
                        <button onClick={handlelogout} className="btn btn-primary">
                            Logout
                        </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
