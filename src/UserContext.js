import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const UserContext = createContext();


const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();


  function getToken(credentials) {
    if (!token) {
      // fetch en setToken en return token
      const login = {
        client_id: "administration",
        grant_type: "password",
        scopes: "write",
        username: credentials.email,
        password: credentials.password,
      };
      fetch("https://www.freshcotton.com/api/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      })
        .then((data) => data.json())
        .then( data => {
          if(data.access_token){
            setToken(data);
            navigate("/")
          } else{
            setError('Incorrect user credentials')
          }
        })
      //   .then((data) => {if(data.ok == true){
      //     console.log(data.json())
      //     setToken(data.json())
      //     navigate("/")

      //   }
      //   else {
      //     console.log("false")
      //     setError(() => (
      //       <p className="text-danger text-center">
      //         <b>Error</b> Incorrect user credentials.
      //       </p>
      //     ));
      //   }
      
      // })
        // .then((data) => data.json())

      return token.access_token;
    }
    const decoded = jwt_decode(token.access_token);
    if (decoded.exp > Date.now()) {
      // fetch en setToken en return token
      const body = {
        grant_type: "refresh_token",
        client_id: "administration",
        refresh_token: token.refreshToken,
      };
      fetch("https://www.freshcotton.com/api/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((data) => data.json())
        .then((data) => setToken(data));
      return token.access_token;
    } else {
      return token.access_token;
    } 

  
  }

 

  const values = {
    token,
    setToken,
    getToken,
    refreshToken,
    setRefreshToken,
    error,
    setError,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
