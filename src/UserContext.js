import { createContext,useState } from "react";
import jwt_decode from "jwt-decode";


export const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [token, setToken ] = useState();
 

const values = {
    token,
    setToken
}


  return (<UserContext.Provider value={values}>{children}</UserContext.Provider>)
}

export default UserContextProvider