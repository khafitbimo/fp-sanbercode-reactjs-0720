import React,{useContext} from 'react';
import {Route,Redirect } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {UserContext} from '../context/UserContext'
import {MovieProvider} from '../context/MovieContext'
import {GamesProvider} from '../context/GamesContext'
import Home from '../pages/Home'
import Games from '../pages/Games'
import Movies from '../pages/Movies'
import GameData from '../pages/GameData'
import MovieData from '../pages/MovieData'
import MovieForm from '../pages/MovieForm'
import Movie from '../pages/Movie'
import Game from '../pages/Game'
import ChangePassword from '../pages/ChangePassword'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));



const Section= ({path}) => {
  const classes = useStyles();
  const [,users,,,] = useContext(UserContext);

  const PrivateRoute = ({component: Component, users, ...rest }) => {
    return(
      <Route
        {...rest}
        render={(props) => users ?
          <Component {...props}/>
          : <Redirect to={{pathname: `${path.path}signin`,state:{from:props.location}}}/>
        }
      />
    )
  };


  return (
    <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            
          <GamesProvider>
            <PrivateRoute exact users={users}  path={`${path.path}games-list`} component={GameData}/>
            <Route path={`${path.path}games/:gamesId`} component={Game} users={users}/>
          </GamesProvider>

          <MovieProvider>
            <PrivateRoute exact users={users}  path={`${path.path}movies-list`} component={MovieData}/>
            <PrivateRoute users={users} path={`${path.path}movies-list/:statusForm/:moviesId?`} component={MovieForm}/>
            <Route path={`${path.path}movies/:moviesId`} component={Movie} users={users}/>
          </MovieProvider>
          

          <Route exact path={`${path.path}games`} component={Games} users={users}/>
          <Route exact path={`${path.path}movies`} component={Movies} users={users}/>
          <PrivateRoute users={users} exact path={`${path.path}change-password`} component={ChangePassword} /> 
          <Route exact path={`${path.path}`} component={Home} users={users}/>
          
            
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
  );
}

export default Section