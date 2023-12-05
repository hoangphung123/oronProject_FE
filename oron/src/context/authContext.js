import { createContext, useEffect, useState } from "react";
import * as UserServices from "../server/userstore";



export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const [currentUser , setCurrentUser] = useState(
            JSON.parse(localStorage.getItem("user") )|| null
    );

    const [currentUserId, setCurrentUserId] = useState([])


    const login = async (loginData)=>{
       const response = await UserServices.loginUser(loginData);
       localStorage.setItem("access_token", JSON.stringify(response.data.token));
       const accessToken = response.data.token;
      // Call the getProfile function passing the token
      const profileUser = await UserServices.getProfile(accessToken);
      setCurrentUser(profileUser)
      console.log(currentUser.data.username)
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    },[currentUser]);   


    return (
        <AuthContext.Provider value = {{currentUser, login, setCurrentUser, currentUserId, setCurrentUserId }}>
            {children}
        </AuthContext.Provider>
    )
}