import React, { useState, useEffect,useContext } from 'react'
import axios from 'axios'
import { GamesContext } from '../context/GamesContext'
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
      }
  }));

const Game = ({match}) => {
    const classes = useStyle();
    const [apiGame] = useContext(GamesContext)
    const [game,setGame] = useState({
        id : 0,
        name : "",
        genre : "",
        singlePlayer : true,
        multiPlayer : true,
        platform : "",
        release : (new Date()).getFullYear(),
        image_url : ""
    })
    const gameId = parseInt(match.params.gamesId)


    useEffect(()=>{
        if (game.id===0) {
            axios.get(`${apiGame}/${gameId}`)
            .then(res => {
                console.log(res.data)
                setGame({
                    id : res.data.id,
                    name : res.data.name,
                    genre : res.data.genre,
                    singlePlayer : res.data.singlePlayer,
                    multiPlayer : res.data.multiplayer,
                    platform : res.data.platform,
                    release : res.data.release,
                    image_url : res.data.image_url
                })
            })
        }
    },[game])

  
    return(
        <Paper >
      
            <Grid container>
                
                <Grid item md={12} lg={12} xs={12} className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${game.image_url})` }}>
                    {<img style={{ display: 'none' }} src={game.image_url} />}
                    <div className={classes.overlay} />
                    <div className={classes.mainFeaturedPostContent}>
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                        {game.name}
                        </Typography>
                        <Typography variant="h6" component="h6" color="inherit"  gutterBottom>
                        {game.genre}
                        </Typography>
                        <Typography variant="h6" component="h6" color="inherit" gutterBottom>
                            Tahun : {game.release}
                        </Typography>
                        <Typography variant="h6" component="h6" color="inherit" gutterBottom>
                            Platform : {game.platform}
                        </Typography>
                        
                    </div>
                </Grid>
                <Grid item md={12} lg={12} xs={12}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Typography variant="body2" paragraph>
                            Single Player : {game.singlePlayer}
                            </Typography>
                            <Typography variant="body2" paragraph>
                            Multi Player : {game.multiPlayer}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )

    
}


export default Game