import React, { useState, useContext } from "react";
import { Route, Routes, Navigate, Outlet } from  'react-router-dom';
import  Home  from './pages/Home';
import  Login  from './pages/Login';
import  Pac  from './pages/Pac';
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {

  return (
    <>
     <Routes>
      <Route element={<PrivateRoute/>}>
      <Route path="/" element={<Home />} />
      <Route path="/pac" element={<Pac />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
</>
  );
};

export default App;


