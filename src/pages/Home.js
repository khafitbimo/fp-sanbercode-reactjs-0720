import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography, Table, TableBody, TableRow, TableCell, CardActionArea, Card, CardContent, Hidden, CardMedia } from '@material-ui/core';
import Axios from 'axios';
import {Link as LinkRouter} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  card : {
    display: 'flex',
    height : 240
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width:160
  },
}));

const aboutData = [
  {no: 1, field:"Nama",value:"Khafit Bimo Prasetyo"}
  ,{no: 2,field:"Email",value:"khafit.bimo@gmail.com"}
  ,{no: 3,field:"Sistem Operasi yang digunakan",value:"Windows 10"}
  ,{no: 4,field:"Akun Github",value:"https://github.com/khafitbimo"}
  ,{no: 5,field:"Akun Telegram",value:"@khafitbimo"}
]

const About = () => {
  return(
    <>
    <Typography variant="h5" component="h5" color="primary" >Data Peserta Sanbercode Bootcamp Reactjs</Typography>
    <Table>
      <TableBody>
        {
          aboutData.sort((a,b) => parseInt(a.rating) - parseInt(b.rating)).map((el,index)=>{
            return(
              <TableRow>
              <TableCell>{el.field}</TableCell>
              <TableCell>:</TableCell>
              <TableCell>{el.value}</TableCell>
            </TableRow>
            )
          })
        }
        
      </TableBody>
    </Table>
    </>
  )
}

const MovieUpdate = () => {
  const classes = useStyles();
  const [movie,setMovie] = useState({
    id: 0,
    created_at: 0,
    updated_at: 0,
    title: "",
    description: "",
    year: 0,
    duration: 0,
    genre: "",
    rating: 0,
    image_url: ""
  })

  useEffect(() => {
    if (movie.id === 0) {
      Axios.get('https://backendexample.sanbersy.com/api/movies')
      .then(res => {
        let maxId = Math.max.apply(Math,res.data.map((o) => {return o.id;}))
        let updateMovie = res.data.find(el => el.id === maxId)
        setMovie(updateMovie)
      })
    }
  },[movie])

  return(
    <Grid item xs={12} md={6}>
      <CardActionArea component={LinkRouter} to={`/movies/${movie.id}`} >
        <Card className={classes.card }>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {movie.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {`${movie.year} - ${movie.genre}`}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {movie.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue Reading...
              </Typography>

            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={movie.image_url} title={movie.title}/>
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  )
}
const GameUpdate = () => {
  const classes = useStyles();
  const [game,setGame] = useState({
    id : 0,
    created_at : 0,
    updated_at : 0,
    name : "",
    genre : "",
    singlePlayer : 0,
    multiPlayer : 0,
    platform : "",
    release : 0,
    image_url : ""
  })

  useEffect(() => {
    if (game.id === 0) {
      Axios.get('https://backendexample.sanbersy.com/api/games')
      .then(res => {
        let maxId = Math.max.apply(Math,res.data.map((o) => {return o.id;}))
        let updateGame = res.data.find(el => el.id === maxId)
        setGame(updateGame)
      })
    }
  },[game])

  return(
    <Grid item xs={12} md={6}>
      <CardActionArea component={LinkRouter} to={`/games/${game.id}`}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {game.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {`${game.release} - ${game.genre}`}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {game.platform}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue Reading...
              </Typography>

            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={game.image_url} title={game.name}/>
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  )
}

const Home = () => {

  const classes = useStyles();
  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <>
    <Grid container spacing={3}>
            <Grid container spacing={4} xs={12}>
                <MovieUpdate/>
                <GameUpdate/>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <About/>
                  </Paper>
                </Grid>
            </Grid>
            
          </Grid>
    </>
          
          
  );
}

export default Home