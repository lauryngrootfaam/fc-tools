
import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

// import {auth} from '../pages/Login';

// import Login from '../pages/Login'



const PrivateRoute = () => {
  const {token} = useContext(UserContext);
  
    let auth = !!token.access_token;
  return (

    auth ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoute
