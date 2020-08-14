import React, {useContext,useState,useEffect, Fragment} from 'react'
import axios from 'axios'
import { makeStyles, Table, TableHead, TableRow, TableCell, TableBody, Button,Modal,Backdrop,Fade, 
    FormControlLabel,InputLabel,Input,FormHelperText,Grid,TextField,Checkbox,Link  } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import PlusIcon from '@material-ui/icons/Add'
import {MovieContext} from '../context/MovieContext'

import {Link as LinkRouter} from 'react-router-dom'


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


const MovieData = ({match})=>{
    const [apiMovie,] = useContext(MovieContext)
    const [movies,setMovies] = useState(null);
    const [selectedId,setSelectedId] = useState(0)
    const [open, setOpen] = useState(false);

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


    const Action = ({movieId}) => {
        const handleDelete = () => {
            let newMovies = movies.filter(el => el.id != movieId)

            axios.delete(`${apiMovie}/${movieId}`)
            .then(res => {
                console.log(res)
            })

            setMovies([...newMovies])
        }

        return(
            <>
            <Button
            component={LinkRouter}
            to={`${match.url}/edit/${movieId}`}
            variant='contained' 
            color='primary' 
            className={classes.button}
            ><EditIcon/></Button>
            &nbsp;
            <Button 
            variant='contained' 
            color='secondary'
            className={classes.button}
            onClick={handleDelete}><DeleteIcon/></Button>
            </>
        )
    }

    return(
        <>
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <Typography componecomponent="h2" variant="h4" color="primary" gutterBottom>Movie List</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                    component={LinkRouter}
                    to={`${match.url}/create`}
                    variant='outlined' 
                    color='inherit' 
                    className={classes.button}
                    ><PlusIcon/></Button>
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
                        {/* <TableCell>Review</TableCell>
                        <TableCell>Image Url</TableCell> */}
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
        
        
        </>
    )
}

export default MovieData