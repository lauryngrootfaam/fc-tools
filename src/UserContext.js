import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  function getToken(credentials) {
    console.log(process.env)
    if (!token) {
      // fetch en setToken en return token
      const login = {
        client_id: "administration",
        grant_type: "password",
        scopes: "write",
        username: credentials.email,
        password: credentials.password,
      };
      fetch(`${process.env.REACT_APP_TOKEN_LINK}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.access_token) {
            setToken(data);
            navigate("/");
          } else {
            setError("Incorrect user credentials");
          }
        });

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
      fetch(``, {
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
