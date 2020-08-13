import React from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {DrawerProvider} from '../context/DrawerContext'
import Header from './Header'
import SideBar from './SideBar'
import Section from './Section'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  
}));

const Dashboard = ({match}) => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <DrawerProvider>
        <Header/>
        <SideBar/>
        <Section/>
      </DrawerProvider>
      
    </div>
  );
}

export default Dashboard