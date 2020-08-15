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
        image_url : ""
    })


    return(
        <GamesContext.Provider value = {[apiGame,games,setGames,inputGame,setInputGame]}>
            {props.children}
        </GamesContext.Provider>
    )
}
