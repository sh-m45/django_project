import axios from "axios";
import Joi from "joi";
import React, { useState, useEffect } from "react";
import style from "./Register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Company() {
  let [user, setUser] = useState({
    first_name: "",
    desc: "",
    email: "",
    password: "",
  });
  let [error, setError] = useState("");
  let [errorList, setErroeList] = useState([]);
  let Navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  function getUser(e) {
    let userCopy = { ...user };
    userCopy[e.target.name] = e.target.value;
    setUser(userCopy);
  }

  async function formSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let { data } = await axios.post(
      `https://route-egypt-api.herokuapp.com/signup`,
      user
    );
    //console.log(data.message);
    if (data.message === "success") {
      setLoading(false);
      Navigate("/login");
    } else {
      setError(data.message);
      setLoading(false);
    }

    let validationForm = validationRegister();
    if (validationForm.error) {
      //console.log('error');
      setErroeList(validationForm.error.details);
    } else {
      //console.log('success');
    }
  }

  function validationRegister() {
    let scheme = Joi.object({
      first_name: Joi.string().min(3).max(30).required(),
      desc: Joi.string().min(20).max(100).required(),
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required(),
      //   age: Joi.number().min(1).max(90).required(),
      password: Joi.string()
        .pattern(new RegExp("^[A-Z][a-z][0-9]{3,30}$"))
        .required(),
    });
    return scheme.validate(user, { abortEarly: false });
  }

  return (
    <div>
      <div className={style.HomeStyle}>
        <div className="container d-flex justify-content-center align-items-center pt-5">
          <form className="w-50" onSubmit={formSubmit}>
            <div className="d-flex justify-content-center text-white mt-5">
              <h1>Register As Company</h1>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3 mt-3">
              <label htmlFor="first_name" className="form-label">
                {" "}
                Comapny Name{" "}
              </label>
              <input
                onChange={getUser}
                type="text"
                className="form-control"
                name="first_name"
              ></input>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                {" "}
                Comapny Email
              </label>
              <input
                onChange={getUser}
                type="email"
                className="form-control"
                name="email"
              ></input>
            </div>

            <div className="mb-3">
              <label htmlFor="desc" className="form-label">
                Describe Company
              </label>
              <input
                onChange={getUser}
                type="text"
                className="form-control"
                name="desc"
              ></input>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Your Password
              </label>
              <input
                onChange={getUser}
                type="password"
                className="form-control"
                name="password"
              ></input>
            </div>

            <div>
              {errorList.map((error, index) => (
                <div className="alert alert-danger p-2">{error.message}</div>
              ))}
            </div>

            <div className="d-flex d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                {loading ? <FontAwesomeIcon icon={faSpinner} /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
