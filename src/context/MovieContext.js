import React, { useState,createContext,useEffect } from 'react';
import axios from 'axios'

export const MovieContext = createContext();

export const MovieProvider = props=>{
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

    const [statusForm,setStatusForm] = useState("create")
    

   

    return(
        <MovieContext.Provider value = {[apiMovie,movies,setMovies,inputMovie,setInputMovie,statusForm,setStatusForm]}>
            {props.children}
        </MovieContext.Provider>
    )
}
