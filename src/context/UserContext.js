import React, { useState,createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = props=>{
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const [apiUser] = useState('https://www.backendexample.sanbersy.com/api/users')
    const [inputUser,setInputUser] = useState({username:"",password:""})
    const iniateUser = currentUser ? currentUser : null
    const [users,setUsers] = useState(iniateUser);


    return(
        <UserContext.Provider value = {[apiUser,users,setUsers,inputUser,setInputUser]}>
            {props.children}
        </UserContext.Provider>
    )
}
