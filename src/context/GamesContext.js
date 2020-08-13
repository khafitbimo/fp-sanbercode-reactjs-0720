import React, { useState,createContext,useEffect } from 'react';
import axios from 'axios'

export const GamesContext = createContext();

export const GamesProvider = props=>{
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

    

    useEffect( () => {
        if (games === null){
          axios.get(apiGame)
          .then(res => {
            setGames(res.data.map(el=>{ 
                return {
                    id : el.id,
                    created_at : el.created_at,
                    updated_at : el.updated_at,
                    name : el.name,
                    genre : el.genre,
                    singlePlayer : el.singlePlayer,
                    multiPlayer : el.multiPlayer,
                    platform : el.platform,
                    release : el.release,
                }
            }))
          })
        }
      }, [games])

    return(
        <GamesContext.Provider value = {[apiGame,games,setGames,inputGame,setInputGame]}>
            {props.children}
        </GamesContext.Provider>
    )
}
