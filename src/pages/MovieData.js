import React, {useContext,useState,useEffect, Fragment} from 'react'
import axios from 'axios'
import { makeStyles, Table, TableHead, TableRow, TableCell, TableBody, Button, 
    Grid,TextField  } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import PlusIcon from '@material-ui/icons/Add'
import {MovieContext} from '../context/MovieContext'

import {Link as LinkRouter} from 'react-router-dom'


const useStyle = makeStyles((theme) => (
    {
        buttonAdd:{
            float:'right'
        }
    }
))


const MovieData = ({match})=>{
    const [apiMovie,] = useContext(MovieContext)
    const [movies,setMovies] = useState(null);
    const [sortType,setSortType] = useState(true) // true : asc , false : desc

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


      const sortColumn = (field) => {
       setSortType(!sortType)

        const sorted = [...movies].sort(function(a,b){
            switch (field) {
                case "title":
                    if (sortType) {
                        return (a.title.toUpperCase() > b.title.toUpperCase()) ? 1 : ((b.title.toUpperCase() > a.title.toUpperCase()) ? -1 : 0);
                    }else{
                        return (a.title.toUpperCase() < b.title.toUpperCase()) ? 1 : ((b.title.toUpperCase() < a.title.toUpperCase()) ? -1 : 0);
                    }
                   
                case "description":
                    if (sortType) {
                        return (a.description.toUpperCase() > b.description.toUpperCase()) ? 1 : ((b.description.toUpperCase() > a.description.toUpperCase()) ? -1 : 0);
                    }else{
                        return (a.description.toUpperCase() < b.description.toUpperCase()) ? 1 : ((b.description.toUpperCase() < a.description.toUpperCase()) ? -1 : 0);
                    }
                
                case "year":
                    if (sortType) {
                        return (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0);
                    }else{
                        return (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0);
                    }
                  
                case "duration":
                    if (sortType) {
                        return (a.duration > b.duration) ? 1 : ((b.duration > a.duration) ? -1 : 0);
                    }else{
                        return (a.duration < b.duration) ? 1 : ((b.duration < a.duration) ? -1 : 0);
                    }
                   
                case "genre":
                    if (sortType) {
                        return (a.genre.toUpperCase() > b.genre.toUpperCase()) ? 1 : ((b.genre.toUpperCase() > a.genre.toUpperCase()) ? -1 : 0);
                    }else{
                        return (a.genre.toUpperCase() < b.genre.toUpperCase()) ? 1 : ((b.genre.toUpperCase() < a.genre.toUpperCase()) ? -1 : 0);
                    }
                  
                case "rating":
                    if (sortType) {
                        return (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0);
                    }else{
                        return (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0);
                    }
                 
            
                default:
                    break;
            }
        })

          setMovies(sorted);
      }

    const Action = ({movieId}) => {
        const handleDelete = () => {
            let newMovies = movies.filter(el => el.id !== movieId)

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

    const handleSearch = (event) => {
        let strSearch = event.target.value
        axios.get(apiMovie)
          .then(res => {

            let findMovies = res.data.filter(o => o.title.toLowerCase().includes(strSearch.toLowerCase())
                                                || o.year.toString().toLowerCase().includes(strSearch.toLowerCase())
                                                || o.genre.toLowerCase().includes(strSearch.toLowerCase())
                                                || o.rating.toString().toLowerCase().includes(strSearch.toLowerCase())
            )

            setMovies(findMovies.map(el=>{ 
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
    return(
        <>
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={6} lg={6}>
                <Typography component="h2" variant="h4" color="primary" gutterBottom>Movie Table</Typography>
                </Grid>
                <Grid item xs={6} sm={6} lg={6}>
                    <Button
                    component={LinkRouter}
                    to={`${match.url}/create`}
                    variant='outlined' 
                    color='inherit' 
                    className={classes.buttonAdd}
                    ><PlusIcon/></Button>
                </Grid>
                <Grid item xs={12} sm={8} lg={8}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="search"
                        label="Search"
                        name="search"
                        onChange={handleSearch}
                    />
                </Grid>
            </Grid>

            <Table size='medium'>
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell onClick={()=>sortColumn("title")}>Title</TableCell>
                        <TableCell onClick={()=>sortColumn("year")}>Year</TableCell>
                        <TableCell onClick={()=>sortColumn("duration")}>Duration</TableCell>
                        <TableCell onClick={()=>sortColumn("genre")}>Genre</TableCell>
                        <TableCell onClick={()=>sortColumn("rating")}>Rating</TableCell>
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
                                    <TableCell>{item.year}</TableCell>
                                    <TableCell>{parseFloat(item.duration / 60).toFixed(2)} jam</TableCell>
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