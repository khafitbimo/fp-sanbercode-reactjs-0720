import React from 'react'
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HeaderBar from './HeaderBar'
import SideBar from './SideBar'
import Section from './Section'
import {DrawerProvider} from '../context/DrawerContext'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    }
  }));

const Dashboard = ({match}) => {
    const classes = useStyles();
    return(
        
        <div className={classes.root}>
            <CssBaseline/>
            <DrawerProvider>
                <HeaderBar path={match}/>
                <SideBar path={match}/>
                <Section path={match}/>
            </DrawerProvider>
            
        </div>
        
    )
}

export default Dashboard