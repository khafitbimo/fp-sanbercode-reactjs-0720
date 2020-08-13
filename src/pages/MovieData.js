import React, {useContext,useState,useEffect, Fragment} from 'react'
import axios from 'axios'
import { makeStyles, Table, TableHead, TableRow, TableCell, TableBody, Button,Modal,Backdrop,Fade, 
    FormControlLabel,InputLabel,Input,FormHelperText,Grid,TextField,Checkbox,Link  } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import PlusIcon from '@material-ui/icons/Add'
import {AppContext} from '../context/AppContext'

const MovieData = ()=>{
    const {userContext,movieContext,gameContext,drawerContext} = useContext(AppContext)

    const [apiMovie,movies,setMovies,inputMovie,setInputMovie] = movieContext

    const [selectedId,setSelectedId] = useState(0)
    const [statusForm,setStatusForm] = useState("create")
    const [open, setOpen] = useState(false);

    const useStyle = makeStyles((theme) => (
        {
            
            modal: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width:'50%',
                margin: 'auto'
            },
            paper: {
                backgroundColor: theme.palette.background.paper,
                border: '2px solid #000',
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
        }
    ))

    const classes = useStyle();

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
            }).catch(error => {
                console.log(error)
            })
        }else if (statusForm === 'edit') {
            
            axios.put(`${apiMovie}/${selectedId}`, {
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
            let selectedMovie = movies.find(el=> el.id === selectedId)
            selectedMovie.title = inputMovie.title
            selectedMovie.description = inputMovie.description
            selectedMovie.year = inputMovie.year
            selectedMovie.duration = inputMovie.duration
            selectedMovie.genre = inputMovie.genre
            selectedMovie.rating = inputMovie.rating
            selectedMovie.review = inputMovie.review
            selectedMovie.image_url = inputMovie.image_url
            setMovies([...movies])
        }).catch(error => {
            console.log(error)
        })
        }

        setStatusForm("create")
        setSelectedId(0)
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
        setOpen(false)

    }

  
    const Action = ({movieId}) => {
        const handleDelete = () => {
            let newMovies = movies.filter(el => el.id != movieId)

            axios.delete(`${apiMovie}/${movieId}`)
            .then(res => {
                console.log(res)
            })

            setMovies([...newMovies])
        }

        const handleEdit = () => {
            let selectMovie = movies.find(el => el.id === movieId)
            console.log(movieId)
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
            setSelectedId(movieId)
            setStatusForm("edit")
            setOpen(true);
        }

        return(
            <>
            <Button 
            variant='contained' 
            color='primary' 
            className={classes.button}
            onClick={handleEdit}><EditIcon/></Button>
            &nbsp;
            <Button 
            variant='contained' 
            color='secondary'
            className={classes.button}
            onClick={handleDelete}><DeleteIcon/></Button>
            </>
        )
    }

    const handleOpen = (formStatus) => {
        setStatusForm(formStatus)
        setOpen(true);
        
    };

    const handleClose = () => {
        setOpen(false);
    };

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

    
    const ModalForm = () => {
        
    
        return(
            <>
            </>
        )
    }



    return(
        <>
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <Typography componecomponent="h2" variant="h4" color="primary" gutterBottomnt >Movie List</Typography>
                </Grid>
                <Grid item xs={12} sm={6} alignItems="flex-end">
                    <Button 
                    variant='outlined' 
                    color='inherit' 
                    className={classes.button}
                    onClick={()=>handleOpen('create')}><PlusIcon/></Button>
                </Grid>
            </Grid>
            
            
            <Table size='medium'>
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Genre</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Review</TableCell>
                        <TableCell>Image Url</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        movies !== null && movies.map((item,index)=>{
                            return(
                                <TableRow key={index}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.year}</TableCell>
                                    <TableCell>{item.duration}</TableCell>
                                    <TableCell>{item.genre}</TableCell>
                                    <TableCell>{item.rating}</TableCell>
                                    <TableCell>{item.review}</TableCell>
                                    <TableCell>{item.image_url}</TableCell>
                                    <TableCell>
                                        <Action movieId={item.id}/>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </Fragment>
        
        <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <Typography componecomponent="h2" variant="h4" color="primary" gutterBottomnt >Movie Form</Typography>
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
                                {statusForm == 'create' ? 'Save' : 'Update'}
                            </Button>
                        </Grid>
                        
                    </form>
            
                </div>
                </Fade>
            </Modal>
        </>
    )
}

export default MovieData