import React, { useContext, useState, Fragment } from 'react'
import axios from 'axios'
import {UserContext} from '../context/UserContext'
import { Grid, makeStyles, Typography, TextField, Button, Collapse, IconButton} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

const useStyle = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
      },
}))

const ChangePassword = () => {
    const [apiUser,,,,] = useContext(UserContext)
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const [inputPassword,setInputPassword] = useState({
        oldPassword : "",
        newPassword : "",
        confirmPassword : ""
    })
    const [messages,setMessages] = useState("");
    const classes = useStyle();

    const handleSubmit = (event) => {
        event.preventDefault()

        if (inputPassword.oldPassword.replace(/\s/g,'') === '' ||
        inputPassword.newPassword.replace(/\s/g,'') === '' || 
        inputPassword.confirmPassword.replace(/\s/g,'') === '') {
            setMessages("Please Input Required Field")
            return
        }

        if (currentUser.password !== inputPassword.oldPassword) {
            setMessages("Wrong old Password")
            return
        }

        if (inputPassword.newPassword !== inputPassword.confirmPassword) {
            setMessages("Please Re-type your new password")
            return
        }

        axios.put(`${apiUser}/${currentUser.id}`,{
            updated_at : new Date(),
            password : inputPassword.newPassword

        }).then(res=>{
            localStorage.setItem("user", JSON.stringify({id : currentUser.id,username: currentUser.username, password: inputPassword.newPassword}))
            setMessages("Password changed successfully")
        })

        setInputPassword({
            oldPassword: "",
            newPassword:"",
            confirmPassword:""
        })


    }

    const handleChange = (event) => {
        let typeOfInput = event.target.name

        switch (typeOfInput) {
            case "oldPassword":
                setInputPassword({...inputPassword,oldPassword:event.target.value})
                break;
            case "newPassword":
                setInputPassword({...inputPassword,newPassword:event.target.value})
                break;
            case "confirmPassword":
                setInputPassword({...inputPassword,confirmPassword:event.target.value})
                break;
        
            default:
                break;
        }
    }

    return(
        <>
        <Fragment>
            <Typography component="h2" variant="h4" color="primary" gutterBottom>Change Password</Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        name="oldPassword"
                        variant="outlined"
                        required
                        fullWidth
                        id="oldPassword"
                        label="Old Password"
                        autoFocus
                        type="password"
                        value={inputPassword.oldPassword}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        name="newPassword"
                        variant="outlined"
                        required
                        fullWidth
                        id="newPassword"
                        label="New Password"
                        type="password"
                        value={inputPassword.newPassword}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        name="confirmPassword"
                        variant="outlined"
                        required
                        fullWidth
                        id="confirmPassword"
                        label="Re-Type Password"
                        type="password"
                        value={inputPassword.confirmPassword}
                        onChange={handleChange}
                        />
                    </Grid>
                    {
                        messages !== "" ? 
                        <Grid item xs={12}>
                            <Typography component="p" variant="p" align="center" color="secondary">
                            {messages}
                            </Typography>
                        </Grid>
                        : null
                    }
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                        Save
                    </Button>
                </Grid>
            </form>
        </Fragment>
        </>
    )
}

export default ChangePassword