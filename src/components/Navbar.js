import React from "react";
// import bootstrap from 'bootstrap'
import { Dropdown } from 'react-bootstrap';

import icon from "../icon.jpg";

const Navbar = (props) => {
    return (
        <div className="">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <img src={icon} alt="bank" className="align-left inline-block mx-2" width="50" height="30" />
                    <a className="navbar-brand" href="#">DApp Yield Staking (Decentralized Banking)</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-2">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-2" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown mx-2">
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        Dropdown
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-2 disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                        <div className="d-flex">
                            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                            <button className="btn btn-outline-success">ACCOUNT NUMBER: {props.account}</button>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Navbar;
