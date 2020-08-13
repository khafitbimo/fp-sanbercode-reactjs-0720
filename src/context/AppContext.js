import React, { useState,createContext,useEffect } from 'react';
import axios from 'axios'

export const AppContext = createContext();

export const AppProvider = props=>{
    const [apiUser] = useState('https://www.backendexample.sanbersy.com/api/users')
    const [users,setUsers] = useState(null);
    const [isLogin,setIsLogin] = useState(false);
    const [inputUser,setInputUser] = useState({username:"",password:""})

    const [apiMovie] = useState('https://backendexample.sanbersy.com/api/movies')
    const [movies,setMovies] = useState(null);
    const [inputMovie,setInputMovie] = useState({
        id: 0,
        created_at: "",
        updated_at: "",
        title: "",
        description: "",
        year: (new Date()).getFullYear(),
        duration: 0,
        genre: "",
        rating: 0,
        image_url: ""
    })

    const [apiGame] = useState('https://backendexample.sanbersy.com/api/games')
    const [games,setGames] = useState(null);
    const [inputGame,setInputGame] = useState({
        id : 0,
        created_at : "",
        updated_at: "",
        name : "",
        genre : "",
        singlePlayer : true,
        multiPlayer : true,
        platform : "",
        release : (new Date()).getFullYear(),
    })

    const [open, setOpen] = useState(true);

    useEffect( () => {
        if (users === null){
          axios.get(apiUser)
          .then(res => {
            setUsers(res.data.map(el=>{ return {
                id: el.id, 
                created_at: el.created_at, 
                updated_at: el.updated_at,
                username: el.username,
                password: el.password
              }
            }))
          })
        }

      }, [users])

    return(
        <AppContext.Provider value = {{
            userContext: [apiUser,users,setUsers,isLogin,setIsLogin,inputUser,setInputUser],
            movieContext: [apiMovie,movies,setMovies,inputMovie,setInputMovie],
            gameContext : [apiGame,games,setGames,inputGame,setInputGame],
            drawerContext : [open, setOpen]}}>
            {props.children}
        </AppContext.Provider>
    )
}
