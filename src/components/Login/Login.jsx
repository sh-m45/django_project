import React, {useState} from "react";
import axios from "axios";
import Joi from "joi";
import style from "./Login.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

export default function Login(props) {
    let [user, setUser] = useState({
        username: "",
        password: "",
    });

    let [error, setError] = useState("");
    let [errorList, setErrorList] = useState([]);
    let navigate = useNavigate();
    let [loading, setLoading] = useState(false);

    function getUser(e) {
        let userCopy = {...user};
        userCopy[e.target.name] = e.target.value;
        setUser(userCopy);
        // console.log(userCopy);
    }

    async function formSubmit(e) {
        e.preventDefault();
        setLoading(true);

        let {data} = await axios.post(
            `http://localhost:8000/api/v1/account/login`,
            user
        );
        if (data.message === "success") {
            let userData = JSON.stringify(data);
            console.log(userData);
            localStorage.setItem("userToken", data.token);
            localStorage.setItem("userData", userData);
            navigate("/jobs");
            setLoading(false);
            props.getUserData();
        } else {
            setError(data.message);
            setLoading(false);
        }
        // part of api in form

        let validationForm = validationRegister();
        if (validationForm.error) {
            //console.log('error');
            setErrorList(validationForm.error.details);
        } else {
            //console.log('success');
        }
    }

    function validationRegister() {
        let scheme = Joi.object({
            username: Joi.string()
                .email({tlds: {allow: ["com", "net"]}})
                .required(),
            password: Joi.string().pattern(new RegExp("")).required(),
        });
        return scheme.validate(user, {abortEarly: false});
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
                        <div className="d-flex justify-content-center text-white">
                            <h1>Login Now</h1>
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Your Email
                            </label>
                            <input
                                onChange={getUser}
                                type="email"
                                className="form-control"
                                name="username"
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
                                {loading ? <FontAwesomeIcon icon={faSpinner}/> : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
