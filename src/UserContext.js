import { createContext,useState } from "react";
import jwt_decode from "jwt-decode";


export const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [token, setToken ] = useState("da");

    // const decoded = jwt_decode(token)
    // console.log(decoded);


// async function refreshtoken (){
// //post refreshtoken elke keer als de time is expired
// // een timestamp meegeven aan de token
// //de timestamps vergelijken

// const body = {
//   "client_id": "administration",
//   "grant_type": "password",
//   "scopes": "write",
//   "username": "lauryn",
//   "password": "freshcotton123"
// }

// const  fetchRefreshToken =  await fetch("https://www.freshcotton.com/api/oauth/token",
//   {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   }
// );

// const convertRefreshToken =  await fetchRefreshToken.json();
// }

// function auth () {
// if (token = true)

// }
 

const values = {
    token,
    setToken
}


  return (<UserContext.Provider value={values}>{children}</UserContext.Provider>)
}

export default UserContextProvider