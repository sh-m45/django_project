import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import style from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

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
                {localStorage.getItem("userToken") ? (
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
                {JSON.parse(localStorage.getItem("userData")).company || "" ? (
                  <li className="nav-item px-2">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to={"/jobs/create"}
                    >
                      Create A Job
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
              </div>
              {localStorage.getItem("userToken") ? (
                <div className="d-flex">
                  <li className="d-flex align-items-center text-light">
                    <div className="text-light">
                      Welcome :{" "}
                      {JSON.parse(localStorage.getItem("userData")).email || ""}
                    </div>
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
                      href="/login"
                    >
                      Logout
                    </a>
                  </li>
                </div>
              ) : (
                <div className="d-flex">
                  <li className="nav-item px-2">
                    <NavLink className="nav-link" to={"/register-developer"}>
                      Register As Developer
                    </NavLink>
                  </li>
                  <li className="nav-item px-2">
                    <NavLink className="nav-link" to={"/register-company"}>
                      Register As Company
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
