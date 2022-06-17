import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Profile from "../components/Profile/Profile";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Header from "./Header";
import Notification from "../components/notifications/Notifications";
import JobsList from "../components/Jobs/JobsList";
import JobDetails from "../components/Jobs/JobsDetails";
import { JobCreate } from "../components/Jobs/JobCreate";

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
      <Header userData={userData} logOut={logOut} />
      <Routes>
        <Route path="/" exact element={<JobsList />} />
        <Route path="/jobs" element={<JobsList />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/jobs/create" element={<JobCreate />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login getUserData={getUserData} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notifications" element={<Notification />} />
      </Routes>
    </>
  );
}
