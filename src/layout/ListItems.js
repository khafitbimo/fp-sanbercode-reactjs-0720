import React from 'react';
import { Link } from "react-router-dom";
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

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/movies">
      <ListItemIcon>
        <MovieIcon />
      </ListItemIcon>
      <ListItemText primary="Movies" />
    </ListItem>
    <ListItem button component={Link} to="/games">
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

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Administrator</ListSubheader>
    <ListItem button component={Link} to="/movie-data">
      <ListItemIcon>
        <MovieIcon />
      </ListItemIcon>
      <ListItemText primary="Movie Editor" />
    </ListItem>
    <ListItem button component={Link} to="/game-data">
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
