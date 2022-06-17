import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import style from "./Header.module.css";
//import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  return (
    <div className={style.navabarStyle}>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={"/jobs"}>
            JobsPortal
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav d-flex justify-content-between w-100">
              <div className="d-flex">
                <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to={"/jobs"}
                    >
                      Home
                    </NavLink>
                </li>
                {props.userData ? (
                  <li className="nav-item px-2">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to={"/jobs"}
                    >
                      Jobs
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}

                {props.userData ? (
                    <li className="nav-item px-2">
                      <NavLink
                          className="nav-link"
                          aria-current="page"
                          to={"/notifications"}
                      >
                        Notifications
                      </NavLink>
                    </li>
                ) : (
                    ""
                )}
              </div>
              {props.userData ? (
                <div className="d-flex">
                  <li className="d-flex align-items-center text-light">
                    <span>Welcome : User</span>
                  </li>
                  <li className="nav-item px-2">
                    <NavLink className="nav-link" to={"/profile"}>
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item px-2">
                    <a
                      onClick={props.logOut}
                      className="nav-link btn btn-danger"
                    >
                      Logout
                    </a>
                  </li>
                </div>
              ) : (
                <div className="d-flex">
                  <li className="nav-item px-2">
                    <NavLink className="nav-link" to={"/register"}>
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item px-2">
                    <NavLink className="nav-link" to={"/login"}>
                      Login <FontAwesomeIcon icon={faRightFromBracket} />{" "}
                    </NavLink>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
