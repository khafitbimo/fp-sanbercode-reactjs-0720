import React,{useContext,useState,useEffect} from 'react'
import axios from 'axios'
import { useHistory,Redirect } from 'react-router-dom';
import { makeStyles, Typography, Grid, TextField,Button } from '@material-ui/core'
import {MovieContext} from '../context/MovieContext'


const useStyle = makeStyles((theme)=>({
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
      },
}))

const MovieForm = ({match}) => {
    const [apiMovie,movies,setMovies,inputMovie,setInputMovie,statusForm,setStatusForm] = useContext(MovieContext)
    const [redirect] = useState(false)
    
    const classes = useStyle();
    const moviesId = parseInt(match.params.moviesId)
    const history = useHistory()

    useEffect( () => {
        if (match.params.statusForm === 'create') {
            setStatusForm(match.params.statusForm) 
            setInputMovie({
                title: "",
                description: "",
                year: (new Date()).getFullYear(),
                duration: 0,
                genre: "",
                rating: 0,
                review: "",
                image_url: ""
            })
        }else if (match.params.statusForm === 'edit') {
            setStatusForm(match.params.statusForm) 
            
            let selectMovie = movies.find(el => el.id === moviesId)
            
            setInputMovie({
                title: selectMovie.title !== null ? selectMovie.title : '' ,
                description: selectMovie.description !== null ? selectMovie.description : '',
                year: selectMovie.year !== null ? selectMovie.year : (new Date()).getFullYear(),
                duration: selectMovie.duration !== null ? selectMovie.duration : 120,
                genre: selectMovie.genre !== null ? selectMovie.genre : '',
                rating: selectMovie.rating !== null ? selectMovie.rating : 0,
                review: selectMovie.review !== null ? selectMovie.review : '',
                image_url: selectMovie.image_url !== null ? selectMovie.image_url : '',
            })
        }
      },[movies])


    const handleSubmit = (event) => {
        event.preventDefault();

        

        if (inputMovie.title.replace(/\s/g,'') === '') {
            return
        }

        if(statusForm === 'create'){
            axios.post(apiMovie,{
                created_at : new Date(),
                title : inputMovie.title,
                description : inputMovie.description,
                year : parseInt(inputMovie.year),
                duration : parseInt(inputMovie.duration),
                genre : inputMovie.genre,
                rating : parseInt(inputMovie.rating),
                review : inputMovie.review,
                image_url : inputMovie.image_url
            })
            .then(res => {
                setMovies([...movies,{
                    id: res.data.id, ...inputMovie}])
                    history.goBack()
                    
            }).catch(error => {
                console.log(error)
            })
        }else if (statusForm === 'edit') {
            
            axios.put(`${apiMovie}/${moviesId}`, {
                updated_at : new Date(),
                title : inputMovie.title,
                description : inputMovie.description,
                year : parseInt(inputMovie.year),
                duration : parseInt(inputMovie.duration),
                genre : inputMovie.genre,
                rating : parseInt(inputMovie.rating),
                review : inputMovie.review,
                image_url : inputMovie.image_url
        })
        .then(res => {
            let selectedMovie = movies.find(el=> el.id === moviesId)
            selectedMovie.title = inputMovie.title
            selectedMovie.description = inputMovie.description
            selectedMovie.year = inputMovie.year
            selectedMovie.duration = inputMovie.duration
            selectedMovie.genre = inputMovie.genre
            selectedMovie.rating = inputMovie.rating
            selectedMovie.review = inputMovie.review
            selectedMovie.image_url = inputMovie.image_url
            setMovies([...movies])
            history.goBack()
            
        }).catch(error => {
            console.log(error)
        })
        }

        setStatusForm("create")
        setInputMovie({
            title: "",
            description: "",
            year: (new Date()).getFullYear(),
            duration: 0,
            genre: "",
            rating: 0,
            review: "",
            image_url: ""
        })
        
    }

    const handleChange = (event) => {
        let typeOfInput = event.target.name
        

        switch (typeOfInput) {
            case "title":
                setInputMovie({...inputMovie, title: event.target.value});
                break;
            case "description":
                setInputMovie({...inputMovie, description: event.target.value});
                break;
            case "year":
                setInputMovie({...inputMovie, year: event.target.value});
                break;
            case "duration":
                setInputMovie({...inputMovie, duration: event.target.value});
                break;
            case "genre":
                setInputMovie({...inputMovie, genre: event.target.value});
                break;
            case "rating":
                setInputMovie({...inputMovie, rating: event.target.value});
                break;
            case "review":
                setInputMovie({...inputMovie, review: event.target.value});
                break;
            case "image_url":
                setInputMovie({...inputMovie, image_url: event.target.value});
                break;
        
            default:
                break;
        }
    }

    return(
        <>
        {
          redirect ? <Redirect to='/movies-list' />:null
        }
        <div className={classes.paper}>
            <Typography component="h2" variant="h4" color="primary" gutterBottom>Movie Form</Typography>
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                variant="outlined"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                autoFocus
                                value={inputMovie.title}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="year"
                                label="Year"
                                type="number"
                                name="year"
                                value={inputMovie.year}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="duration"
                                type="number"
                                label="Duration"
                                id="duration"
                                value={inputMovie.duration}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="genre"
                                label="Genre"
                                name="genre"
                                value={inputMovie.genre}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="rating"
                                type="number"
                                label="Rating"
                                id="rating"
                                value={inputMovie.rating}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                value={inputMovie.description}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="review"
                                label="Review"
                                name="review"
                                value={inputMovie.review}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="image_url"
                                label="Image"
                                name="image_url"
                                value={inputMovie.image_url}
                                onChange={handleChange}
                            />
                        </Grid>
                        
                        <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        >
                            {statusForm === 'create' ? 'Save' : 'Update'}
                        </Button>
                    </Grid>
                    
                </form>
        </div>
        </>
         )
}

export default MovieForm