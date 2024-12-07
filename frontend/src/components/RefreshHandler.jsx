import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = ({setIsAuthentication}) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setIsAuthentication(true);
            if(location.pathname === '/' || location.pathname==='/login' || location.pathname==='/registration'){
                navigate('/home',{replace:false});
            }
        }
    },[location , navigate, setIsAuthentication])
  return (
    null
  )
}

export default RefreshHandler
