import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Joi from 'joi'
import style from './Login.module.css'
import Users from '../Register/Users.json'
import Routing from '../Routing/Routing'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
  let [user, setUser] = useState({
    email: '', password: ''
  });
  
  let [error, setError] = useState('');
  let [errorList, setErroeList] = useState([]);
  let navigate = useNavigate();
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
    let { data } = await axios.post(`https://route-egypt-api.herokuapp.com/signin`, user);
    //console.log(data.message);
    if (data.message === 'success') {
      localStorage.setItem('userToken', data.token)
      navigate('/display');
      setLoading(false);
      props.getUserData();
    }
    else {
      setError(data.message);
      setLoading(false);
    }
    // part of api in form 

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
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(new RegExp('^[A-Z][a-z][0-9]{3,30}$')).required(),

    })
    return scheme.validate(user, { abortEarly: false });
  }

  /// error 
  // let checkUsers = () => {
  //   Users && Users.map(User => {

  //     let userNameRegister = User.user_name ;
  //     let userEmailRegister = User.user_email ;
  //     let userPasswordRegister = User.user_password ;
  //     if(userNameRegister === user.user_name && userEmailRegister === user.user_email && userPasswordRegister === user.user_password)
  //     {
  //       // <Redirect from="/login" to="/home" />
  //       console.log(user.user_name) ;

  //       return ;
  //     }    
  //   })
  // }

  return (
    <div>
      <div className={style.HomeStyle}>

        <div className="container d-flex justify-content-center align-items-center h-100">
          <form className="w-50" onSubmit={formSubmit}>

            <div className="d-flex justify-content-center text-white"><h1>Login Now</h1></div>
            {error && <div className="alert alert-danger">
              {error}
            </div>}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Your Email</label>
              <input onChange={getUser} type="email" className="form-control" name="email"></input>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Your Password</label>
              <input onChange={getUser} type="password" className="form-control" name="password"></input>
            </div>
            <div >
              {errorList.map((error, index) =>
                <div className="alert alert-danger p-2">{error.message}</div>
              )}
            </div>
            <div className="d-flex d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">{loading ? <FontAwesomeIcon icon={faSpinner} /> : 'Login'}</button>
            </div>
          </form>
        </div>

      </div>

    </div>
  )
}
