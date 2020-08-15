import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography, Table, TableBody, TableRow, TableCell } from '@material-ui/core';


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

const Home = () => {

  const classes = useStyles();
  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <>
    <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                {/* <Chart /> */}
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
                {/* <Deposits /> */}
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <About/>
              </Paper>
            </Grid>
          </Grid>
    </>
          
          
  );
}

export default Home