import React,{useContext} from 'react';
import {Link as LinkRouter } from "react-router-dom"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import {UserContext} from '../context/UserContext'
import {DrawerContext} from '../context/DrawerContext'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
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