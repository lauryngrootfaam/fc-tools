
import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

const PrivateRoute = () => {
  const {token, getToken} = useContext(UserContext);
  
    let auth = !!token;
  return (

    auth ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoute
