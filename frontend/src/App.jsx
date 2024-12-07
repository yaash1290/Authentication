import React, { useState } from "react";
import Login from "./components/auth/Login.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import Registration from "./components/auth/Registration.jsx";
import Home from "./components/auth/Home.jsx";
import RefreshHandler from "./components/RefreshHandler.jsx";



function App() {

  const [isAuthenticated , setIsAuthenticated]=useState(false);

  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to="/login"/>
  }

  return (
    <>
    <RefreshHandler setIsAuthentication={setIsAuthenticated}/>
     <Routes>
     <Route path="/" element={<Navigate to="/login"/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/registration" element={<Registration/>}/>
       <Route path="/home" element={<PrivateRoute element={<Home/>}/>}/>
       <Route path="*" element={<PrivateRoute element={<Home/>}/>}/>
     </Routes>
    </>
  );
}

export default App;