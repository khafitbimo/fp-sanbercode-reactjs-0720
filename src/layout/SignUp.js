import React,{useState,useContext} from 'react';
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {UserContext} from '../context/UserContext'
import {Link as LinkRouter,useHistory,Redirect } from "react-router-dom"

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
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const SignUp = () => {
    const [apiUser,,setUsers,inputUser,setInputUser] = useContext(UserContext);
    const [redirect,setRedirect] = useState(false)
    const [messages,setMessages] = useState("");
    const classes = useStyles();
    const history = useHistory()
    

    const handleSubmit = (event)=>{
        event.preventDefault();

        if ((inputUser.username.replace(/\s/g,'') === '') || (inputUser.password.replace(/\s/g,'') === '')) {
            setMessages("Please Fill Username and Password")
            return
        }

        
            axios.post(apiUser,{
                created_at : new Date(),
                username : inputUser.username,
                password : inputUser.password
            })
            .then(res => {
                if (res.data.id) {
                  setUsers(null)
                  setRedirect(true)
                  history.goBack()
                }else{
                  setRedirect(false)
                  setMessages(res.data)
                }
                
            }).catch(error => {
                console.log(error)
                setMessages(error.messages)
            })
        
            setInputUser({
              username : "",
              password : ""
            })
            setMessages("")
    }

    const handleChange = (event) => {
        let typeOfInput = event.target.name
        
        switch (typeOfInput) {
          case "username":
            setInputUser({...inputUser,username: event.target.value});
            break;
          case "password":
            setInputUser({...inputUser,password: event.target.value});
            break;
          default:
            break;
        }
      }

    return(
      <>
      {
        redirect ? <Redirect to='/signin' />:null
      }
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={inputUser.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={inputUser.password}
                onChange={handleChange}
              />
            </Grid>
            
          </Grid>
          <Typography component="p" variant="p" align="center" color="secondary">
              {messages}
            </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={LinkRouter} to='/signin' variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </>
    )
  }

  export default SignUp