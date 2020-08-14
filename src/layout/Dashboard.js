import React,{useContext,useState} from 'react';
import {BrowserRouter as Router,Switch, Route,Link as LinkRouter } from "react-router-dom"
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
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MovieIcon from '@material-ui/icons/Movie';
import GamesIcon from '@material-ui/icons/Games';
import PersonIcon from '@material-ui/icons/Person';
import LayersIcon from '@material-ui/icons/Layers';
import KeyIcon from '@material-ui/icons/VpnKey';
import { Button } from '@material-ui/core';
import Home from '../pages/Home'
import Games from '../pages/Games'
import Movies from '../pages/Movies'
import GameData from '../pages/GameData'
import MovieData from '../pages/MovieData'
import MovieForm from '../pages/MovieForm'
import {UserContext} from '../context/UserContext'
import {MovieProvider} from '../context/MovieContext'
import {GamesProvider} from '../context/GamesContext'

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



const Dashboard= ({match}) => {
  const classes = useStyles();
  const [apiUser,users,setUsers,isLogin,setIsLogin,inputUser,setInputUser] = useContext(UserContext);
  const [open, setOpen] = React.useState(true);
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
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const LoginMenu = ({user, ...props}) => {
    return(
        <>{
          user ?
          <Button color="inherit" variant="outlined" onClick={handleSignOut} >Logout</Button>
          : <Button component={ LinkRouter } to={`${match.path}signin`} color="inherit" variant="outlined">Login</Button>
           
          }
        </>
    )
  
}

const MainListItems = () =>{
    return(
        <div>
          <ListItem button component={LinkRouter} to={`${match.url}`}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={LinkRouter} to={`${match.url}movies`}>
            <ListItemIcon>
              <MovieIcon />
            </ListItemIcon>
            <ListItemText primary="Movies" />
          </ListItem>
          <ListItem button component={LinkRouter} to={`${match.url}games`}>
            <ListItemIcon>
              <GamesIcon />
            </ListItemIcon>
            <ListItemText primary="Games" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Data User" />
          </ListItem>
          </div>
      );
} 

const SecondaryListItems = () => {
    return(
        <div>
          <ListSubheader inset>Administrator</ListSubheader>
          <ListItem button component={LinkRouter} to={`${match.url}movies-list`}>
            <ListItemIcon>
              <MovieIcon />
            </ListItemIcon>
            <ListItemText primary="Movie Editor" />
          </ListItem>
          <ListItem button component={LinkRouter} to={`${match.url}games-list`}>
            <ListItemIcon>
              <GamesIcon />
            </ListItemIcon>
            <ListItemText primary="Game Editor" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItem>
        </div>
      );
} 

  return (
    <div className={classes.root}>
      <CssBaseline />
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
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><MainListItems/></List>
        {
          
          users ? <><Divider /><List><SecondaryListItems/></List></> : null  
        }
        
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            
              <GamesProvider>
              <Route exact path={`${match.path}games-list`} component={GameData}/>
              </GamesProvider>
                
              <MovieProvider>
              <Route exact path={`${match.path}movies-list`} component={MovieData}/>
              </MovieProvider>
             
              <MovieProvider>
              <Route path={`${match.path}movies-list/:statusForm/:moviesId?`} component={MovieForm}/>
              </MovieProvider>
              

              <Route exact path={`${match.path}games`} component={Games}/>
              <Route exact path={`${match.path}movies`} component={Movies}/>
              <Route exact path={`${match.path}`} component={Home}/>
          
            
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard