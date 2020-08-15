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
import Header from './HeaderBar'

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
  }
}));



const HeaderBar = ({path}) => {
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

  const LoginMenu = ({user, ...props}) => {
    return(
        <>{
          user ?
          <Button color="inherit" variant="outlined" onClick={handleSignOut} >Logout</Button>
          : <Button component={ LinkRouter } to={`${path.url}signin`} color="inherit" variant="outlined">Login</Button>
           
          }
        </>
    )
  
  }


  return (

      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Final Project Sanbercode ReactJS 0720
          </Typography>
          <LoginMenu user={users}/>
        </Toolbar>
      </AppBar>

  );
}

export default HeaderBar