import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import Profile from "../Profile/Profile";
import Jobs from "../Jobs/Jobs";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Header from "./Header";
import { render } from "@testing-library/react";
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
        <Route path="/" exact element={<Jobs />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login getUserData={getUserData} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
