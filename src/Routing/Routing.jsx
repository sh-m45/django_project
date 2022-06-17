import React, { useEffect, useState } from "react";
import {
  NavLink,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Header from "./Header";
import RegisterDeveloper from "../Register/RegisterDeveloper";
import RegisterCompany from "../Register/RegisterCompany";
import JobsList from "../Jobs/JobsList";
import JobDetails from "../Jobs/JobDetails";

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

  useEffect(() => {}, [userData]);

  return (
    <>
      <Header userData={userData} logOut={logOut} />
      <Routes>
        <Route path="/" element={<Navigate to="/jobs" />} />
        <Route path="/register-Developer" element={<RegisterDeveloper />} />
        <Route path="/register-company" element={<RegisterCompany />} />
        <Route path="/login" element={<Login getUserData={getUserData} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<JobsList />} />
        <Route path="/jobs/" element={<JobsList />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Routes>
    </>
  );
}
