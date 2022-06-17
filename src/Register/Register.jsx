import axios from 'axios';
import Joi from 'joi';
import React, { useState, useEffect } from 'react';
import style from './Register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Users from './Users.json';
import { useNavigate } from 'react-router-dom'

export default function Register() {


  let [user, setUser] = useState({
    first_name: '', last_name: '', email: '', age: '', password: ''
  });
  let [error, setError] = useState('');
  let [errorList, setErroeList] = useState([]);
  let Navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  function getUser(e) {
    let userCopy = { ...user };
    userCopy[e.target.name] = e.target.value;
    setUser(userCopy);
    // console.log(userCopy);

  }

  async function formSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let { data } = await axios.post(`https://route-egypt-api.herokuapp.com/signup`, user);
    //console.log(data.message);
    if (data.message === 'success') {
      
      setLoading(false);
      Navigate('/login');
    }
    else {
      setError(data.message);
      setLoading(false);
    }
     

    let validationForm = validationRegister();
    if (validationForm.error) {
      //console.log('error');
      setErroeList(validationForm.error.details);
    }
    else {
      //console.log('success');
    }
  }

  function validationRegister() {
    let scheme = Joi.object({
      first_name: Joi.string().min(3).max(30).required(),
      last_name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      age: Joi.number().min(1).max(90).required(),
      password: Joi.string().pattern(new RegExp('^[A-Z][a-z][0-9]{3,30}$')).required(),

    })
    return scheme.validate(user, { abortEarly: false });
  }

  // *********get api from fack website************ 
  // useEffect(() => {
  //   fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=27ebb4a236fbca4c2911c748a7e8207a").then(r => {
  //     return r.json();
  //   }).then(d => console.log(d))
  // }, [])

  return (
    <div>

      <div className={style.HomeStyle}>

        <div className="container d-flex justify-content-center align-items-center pt-5">
          <form className="w-50" onSubmit={formSubmit}>

            <div className="d-flex justify-content-center text-white"><h1>Register Now</h1></div>
            {error && <div className="alert alert-danger">
              {error}
            </div>}
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">Your Name</label>
              <input onChange={getUser} type="text" className="form-control" name="first_name"></input>
            </div>

            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">Your Name</label>
              <input onChange={getUser} type="text" className="form-control" name="last_name"></input>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Your Email</label>
              <input onChange={getUser} type="email" className="form-control" name="email"></input>
            </div>

            <div className="mb-3">
              <label htmlFor="age" className="form-label">Your Age</label>
              <input onChange={getUser} type="number" className="form-control" name="age"></input>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Your Password</label>
              <input onChange={getUser} type="password" className="form-control" name="password"></input>
            </div>

            {/* <div className="mb-3">
              <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
              <input onChange={getUser} type="password" className="form-control" name="confirm_password"></input>
            </div> */}
            <div >
              {errorList.map((error, index) =>
                <div className="alert alert-danger p-2">{error.message}</div>
              )}
            </div>

            <div className="d-flex d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">{loading? <FontAwesomeIcon icon={faSpinner} />: 'Submit'}</button>
            </div>
          </form>

        </div>

      </div>

    </div>

  )
}
