import React,{useContext,useState} from 'react';
import {Route,Link as LinkRouter,Redirect, Router } from "react-router-dom"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MovieIcon from '@material-ui/icons/Movie';
import GamesIcon from '@material-ui/icons/Games';
import PersonIcon from '@material-ui/icons/Person';
import KeyIcon from '@material-ui/icons/VpnKey';
import { Button } from '@material-ui/core';
import Home from '../pages/Home'
import Games from '../pages/Games'
import Movies from '../pages/Movies'
import GameData from '../pages/GameData'
import MovieData from '../pages/MovieData'
import MovieForm from '../pages/MovieForm'
import Movie from '../pages/Movie'
import Game from '../pages/Game'
import ChangePassword from '../pages/ChangePassword'
import {UserContext} from '../context/UserContext'
import {MovieProvider} from '../context/MovieContext'
import {GamesProvider} from '../context/GamesContext'
import {DrawerContext} from '../context/DrawerContext'

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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
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
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));



const Section= ({path}) => {
  const classes = useStyles();
  const [,users,setUsers,,] = useContext(UserContext);
  const [open, setOpen] = useContext(DrawerContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    setUsers(null)
    localStorage.removeItem("user")
  }


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