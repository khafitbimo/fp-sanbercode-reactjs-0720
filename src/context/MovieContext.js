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
    

    useEffect( () => {
        if (movies === null){
          axios.get(apiMovie)
          .then(res => {
            setMovies(res.data.map(el=>{ 
                return {
                    id: el.id,
                    created_at: el.created_at,
                    updated_at: el.updated_at,
                    title: el.title,
                    description: el.description,
                    year: el.year,
                    duration: el.duration,
                    genre: el.genre,
                    rating: el.rating,
                    image_url: el.image_url
                }
            }))
          })
        }
      }, [movies])

    return(
        <MovieContext.Provider value = {[apiMovie,movies,setMovies,inputMovie,setInputMovie]}>
            {props.children}
        </MovieContext.Provider>
    )
}
