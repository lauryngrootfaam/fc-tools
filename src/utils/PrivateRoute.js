
import { Outlet, Navigate } from 'react-router-dom'
// import {auth} from '../pages/Login';

// import Login from '../pages/Login'



const PrivateRoute = () => {
    // let auth = window.localStorage.getItem('token');
    let auth = true;
  return (

    auth ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoute

// authorisation vs authentication