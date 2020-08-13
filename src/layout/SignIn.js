import React,{useState,useEffect, useContext} from 'react';
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {UserContext} from '../context/UserContext'
import { useHistory, Redirect } from 'react-router-dom';
import {BrowserRouter as Router,Switch, Route,Link as LinkRouter } from "react-router-dom"

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
    const [apiUser,users,setUsers,isLogin,setIsLogin,inputUser,setInputUser] = useContext(UserContext);
    const [redirect,setRedirect] = useState(false)
    const [messages,setMessages] = useState("");
    const history = useHistory()

    const classes = useStyles();

      const handleSubmit = (event) => {
        event.preventDefault();

        if ((inputUser.username.replace(/\s/g,'') === '') || (inputUser.password.replace(/\s/g,'')=== '')) {
          setMessages("Please Input Username or Password")
          return
        }

        axios.post(`https://backendexample.sanbersy.com/api/login`,{
          username : inputUser.username,
          password : inputUser.password
        })
        .then(res => {
            setUsers({
                username: res.data.username,
                password: res.data.password
              })
              
              
              if (res.data.id) {
                setIsLogin(true)
                setMessages("")
                localStorage.setItem("user", JSON.stringify({username: res.data.username, password: res.data.password}))
                
                setRedirect(true)
              }else{
                setIsLogin(false)
                setRedirect(false)
                setMessages(res.data)
              }
            
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
          redirect ? <Redirect to='/' />:null
        }
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={inputUser.username}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
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
            <Typography component="p" variant="p" align="center" color="secondary">
              {messages}
            </Typography>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={LinkRouter} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      
        </>
        )
}

export default SignIn