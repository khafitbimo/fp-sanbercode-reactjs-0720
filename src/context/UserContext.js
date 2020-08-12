import React, { useState,createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = props=>{
    const [user,setUser] = useState(null);

    useEffect( () => {
        if (user === null){
          axios.get(`https://www.backendexample.sanbersy.com/api/movies`)
          .then(res => {
            setUser(res.data.map(el=>{ return {
                id: el.id, 
                created_at: el.created_at, 
                updated_at: el.updated_at,
                username: el.username,
                password: el.password
              }
            }))
          })
        }
      }, [user])

    return(
        <UserContext.Provider value = {[user,setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}
