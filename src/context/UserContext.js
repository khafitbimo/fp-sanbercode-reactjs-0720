import React, { useState,createContext,useEffect } from 'react';
import axios from 'axios'

export const UserContext = createContext();

export const UserProvider = props=>{
    const [apiUser] = useState('https://www.backendexample.sanbersy.com/api/users')
    const [users,setUsers] = useState(null);
    const [isLogin,setIsLogin] = useState(false);
    const [inputUser,setInputUser] = useState({username:"",password:""})
    

    // useEffect( () => {
    //     if (users === null){
    //       axios.get(apiUser)
    //       .then(res => {
    //         setUsers(res.data.map(el=>{ return {
    //             id: el.id, 
    //             created_at: el.created_at, 
    //             updated_at: el.updated_at,
    //             username: el.username,
    //             password: el.password
    //           }
    //         }))
    //       })
    //     }
    //   }, [users])

    return(
        <UserContext.Provider value = {[apiUser,users,setUsers,isLogin,setIsLogin,inputUser,setInputUser]}>
            {props.children}
        </UserContext.Provider>
    )
}
