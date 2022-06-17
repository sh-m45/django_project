import React, {useEffect, useState} from "react";
import {NavLink, Route, Routes, useNavigate} from "react-router-dom";

import Profile from "../components/Profile/Profile";
import Jobs from "../components/Jobs/Jobs";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Header from "./Header";
import {render} from "@testing-library/react";
import Notification from "../components/notifications/Notifications";

export default function Routing() {
    const [userData, setUserData] = useState(null);
    let navigate = useNavigate();

    function getUserData() {
        let token = localStorage.getItem("userToken");
        setUserData(token);
    }

    function logOut() {
        localStorage.removeItem("userToken");
        setUserData(null);
    }

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    return (
        <>
            <Header userData={userData} logOut={logOut}/>
            <Routes>
                <Route path="/" exact element={<Jobs/>}/>
                <Route path="/jobs" element={<Jobs/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/login" element={<Login getUserData={getUserData}/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/notifications" element={<Notification/>}/>
            </Routes>
        </>
    );
}
