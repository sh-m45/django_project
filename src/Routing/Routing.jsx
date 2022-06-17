import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import Profile from "../Profile/Profile";
import JobsList from "../Jobs/JobsList";
import Login from "../Login/Login";
import Header from "./Header";
import RegisterDeveloper from "../Register/RegisterDeveloper";
import RegisterCompany from "../Register/RegisterCompany";


export default function Routing() {
  const [userData, setUserData] = useState(null);

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
      <Header userData={userData} logOut={logOut} />
      <Routes>
        <Route path="/" exact element={<JobsList />} />
        <Route path="/jobs" element={<JobsList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login getUserData={getUserData} />} />
        <Route path="/register-Developer" element={<RegisterDeveloper />} />
        <Route path="/register-company" element={<RegisterCompany />} />
      </Routes>
    </>
  );
}
