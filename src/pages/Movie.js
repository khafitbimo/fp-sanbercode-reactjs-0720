import React, { useState, useEffect,useContext } from 'react'
import axios from 'axios'
import { MovieContext } from '../context/MovieContext'
import { Grid, Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyle = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
      overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
      },
      mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(6),
          paddingRight: 0,
        },
      },
  }));

const Movie = ({match}) => {
    const classes = useStyle();
    const [apiMovie] = useContext(MovieContext)
    const [movie,setMovie] = useState({
        id: 0,
        title: "",
        description: "",
        year: (new Date()).getFullYear(),
        duration: 0,
        genre: "",
        rating: 0,
        image_url: ""
    })
    const movieId = parseInt(match.params.moviesId)


    useEffect(()=>{
        if (movie.id===0) {
            axios.get(`${apiMovie}/${movieId}`)
            .then(res => {
                console.log(res.data)
                setMovie({
                    id: res.data.id,
                    created_at: res.data.created_at,
                    updated_at: res.data.updated_at,
                    title: res.data.title,
                    description: res.data.description,
                    year: res.data.year,
                    duration: res.data.duration,
                    genre: res.data.genre,
                    rating: res.data.rating,
                    image_url: res.data.image_url
                })
            })
        }
    },[movie])

  
    return(
        <Paper >
      
            <Grid container>
                
                <Grid item md={12} lg={12} xs={12} className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${movie.image_url})` }}>
                    {<img style={{ display: 'none' }} src={movie.image_url} />}
                    <div className={classes.overlay} />
                    <div className={classes.mainFeaturedPostContent}>
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                        {movie.title}
                        </Typography>
                        <Typography variant="h6" component="h6" color="inherit"  gutterBottom>
                        {movie.genre}
                        </Typography>
                        <Typography variant="h6" component="h6" color="inherit" gutterBottom>
                            Tahun : {movie.year}
                        </Typography>
                        <Typography variant="h6" component="h6" color="inherit" gutterBottom>
                            Durasi : {parseFloat(movie.duration/60).toFixed(2)} Jam
                        </Typography>
                        <Typography variant="h6" component="h6" color="inherit" gutterBottom>
                            Rating : {movie.rating}
                        </Typography>
                        
                    </div>
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Typography variant="body2" paragraph>
                            Description : {movie.description}
                            </Typography>
                            <Typography variant="body2" paragraph>
                            Review : {movie.review}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )

    
}


export default Movie