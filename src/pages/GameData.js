import React, {useContext,useState,useEffect, Fragment} from 'react'
import axios from 'axios'
import { makeStyles, Table, TableHead, TableRow, TableCell, TableBody, Button,Modal,Backdrop,Fade, 
    FormControlLabel,InputLabel,Input,FormHelperText,Grid,TextField,Checkbox,Link  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import PlusIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography';
import {AppContext} from '../context/AppContext'

const GameData = ()=>{
    const {userContext,movieContext,gameContext,drawerContext} = useContext(AppContext)

    const [apiGame,games,setGames,inputGame,setInputGame] = gameContext

    const [selectedId,setSelectedId] = useState(0)
    const [statusForm,setStatusForm] = useState("create")
    const [open, setOpen] = useState(false);

    const useStyle = makeStyles((theme) => (
        {
            
            modal: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width:'50%',
                margin: 'auto'
            },
            paper: {
                backgroundColor: theme.palette.background.paper,
                border: '2px solid #000',
                boxShadow: theme.shadows[5],
                padding: theme.spacing(2, 4, 3),
            },
            form: {
                width: '100%', // Fix IE 11 issue.
                marginTop: theme.spacing(3),
            },
            submit: {
                margin: theme.spacing(3, 0, 2),
              },
        }
    ))

    const classes = useStyle();

    useEffect( () => {
        if (games === null){
          axios.get(apiGame)
          .then(res => {
            setGames(res.data.map(el=>{ 
                return {
                    id : el.id,
                    created_at : el.created_at,
                    updated_at : el.updated_at,
                    name : el.name,
                    genre : el.genre,
                    singlePlayer : el.singlePlayer,
                    multiPlayer : el.multiPlayer,
                    platform : el.platform,
                    release : el.release,
                }
            }))
          })
        }
      }, [games])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputGame.name.replace(/\s/g,'') === '') {
            return
        }

        if(statusForm === 'create'){
            axios.post(apiGame,{
                created_at : new Date(),
                name : inputGame.name,
                genre : inputGame.genre,
                singlePlayer : inputGame.singlePlayer,
                multiPlayer : inputGame.multiPlayer,
                platform : inputGame.platform,
                release : parseInt(inputGame.year)
            })
            .then(res => {
                setGames([...games,{
                    id: res.data.id, ...inputGame}])
            }).catch(error => {
                console.log(error)
            })
        }else if (statusForm === 'edit') {
            
            axios.put(`${apiGame}/${selectedId}`, {
                updated_at : new Date(),
                name : inputGame.name,
                genre : inputGame.genre,
                singlePlayer : inputGame.singlePlayer,
                multiPlayer : inputGame.multiPlayer,
                platform : inputGame.platform,
                release : parseInt(inputGame.year)
        })
        .then(res => {
            let selectedGame = games.find(el=> el.id === selectedId)
            selectedGame.name = inputGame.name
            selectedGame.genre = inputGame.genre
            selectedGame.singlePlayer = inputGame.singlePlayer
            selectedGame.multiPlayer = inputGame.multiPlayer
            selectedGame.platform = inputGame.platform
            selectedGame.release = inputGame.release
            setGames([...games])
        }).catch(error => {
            console.log(error)
        })
        }

        setStatusForm("create")
        setSelectedId(0)
        setInputGame({
            name : "",
            genre : "",
            singlePlayer : true,
            multiPlayer : true,
            platform : "",
            release : (new Date()).getFullYear(),
        })
        setOpen(false)

    }

    const handleChange = (event) => {
        let typeOfInput = event.target.name
        

        switch (typeOfInput) {
            case "name":
                setInputGame({...inputGame, name: event.target.value});
                break;
            case "genre":
                setInputGame({...inputGame, genre: event.target.value});
                break;
            case "singlePlayer":
                setInputGame({...inputGame, singlePlayer: event.target.value});
                break;
            case "multiPlayer":
                setInputGame({...inputGame, multiPlayer: event.target.value});
                break;
            case "platform":
                setInputGame({...inputGame, platform: event.target.value});
                break;
            case "release":
                setInputGame({...inputGame, release: event.target.value});
                break;
        
            default:
                break;
        }
    }

    const Action = ({gameId}) => {
        const handleDelete = () => {
            let newGames = games.filter(el => el.id != gameId)

            axios.delete(`${apiGame}/${gameId}`)
            .then(res => {
                console.log(res)
            })

            setGames([...newGames])
        }

        const handleEdit = () => {
            let selectGame = games.find(el => el.id === gameId)
            console.log(gameId)
            setInputGame({
                name: selectGame.name !== null ? selectGame.name : '' ,
                genre: selectGame.genre !== null ? selectGame.genre : '',
                singlePlayer: selectGame.singlePlayer !== null ? selectGame.singlePlayer : 1,
                multiPlayer: selectGame.multiPlayer !== null ? selectGame.multiPlayer : 1,
                platform: selectGame.platform !== null ? selectGame.platform : '',
                release: selectGame.release !== null ? selectGame.release : (new Date()).getFullYear(),
            })
            setSelectedId(gameId)
            setStatusForm("edit")
            setOpen(true);
        }

        return(
            <>
            <Button 
            variant='contained' 
            color='primary' 
            className={classes.button}
            onClick={handleEdit}><EditIcon/></Button>
            &nbsp;
            <Button 
            variant='contained' 
            color='secondary'
            className={classes.button}
            onClick={handleDelete}><DeleteIcon/></Button>
            </>
        )
    }

    const handleOpen = (formStatus) => {
        setStatusForm(formStatus)
        setOpen(true);
        
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <>
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <Typography componecomponent="h2" variant="h4" color="primary" gutterBottomnt >Game List</Typography>
                </Grid>
                <Grid item xs={12} sm={6} alignItems="flex-end">
                    <Button 
                    variant='outlined' 
                    color='inherit' 
                    className={classes.button}
                    onClick={()=>handleOpen('create')}><PlusIcon/></Button>
                </Grid>
            </Grid>
            
            
            <Table size='medium'>
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Genre</TableCell>
                        <TableCell>Single Player</TableCell>
                        <TableCell>Multi Player</TableCell>
                        <TableCell>Platform</TableCell>
                        <TableCell>Release</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        games !== null && games.map((item,index)=>{
                            return(
                                <TableRow key={index}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.genre}</TableCell>
                                    <TableCell>{item.singlePlayer}</TableCell>
                                    <TableCell>{item.multiPlayer}</TableCell>
                                    <TableCell>{item.platform}</TableCell>
                                    <TableCell>{item.release}</TableCell>
                                    <TableCell>
                                        <Action gameId={item.id}/>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </Fragment>
        <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                <Typography componecomponent="h2" variant="h4" color="primary" gutterBottomnt >Game Form</Typography>
                    <form onSubmit={handleSubmit} className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <TextField
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                value={inputGame.name}
                                onChange={handleChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="genre"
                                label="Genre"
                                name="genre"
                                value={inputGame.genre}
                                onChange={handleChange}
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="singlePlayer"
                                label="Single Player"
                                id="singlePlayer"
                                value={inputGame.singlePlayer}
                                onChange={handleChange}
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="multiPlayer"
                                label="Multi Player"
                                name="multiPlayer"
                                value={inputGame.multiPlayer}
                                onChange={handleChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="platform"
                                label="Platform"
                                id="platform"
                                value={inputGame.platform}
                                onChange={handleChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="release"
                                type="number"
                                label="Release"
                                name="release"
                                value={inputGame.release}
                                onChange={handleChange}
                            />
                            </Grid>
                            <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            >
                                {statusForm == 'create' ? 'Save' : 'Update'}
                            </Button>
                        </Grid>
                        
                    </form>
                </div>
                </Fade>
            </Modal>
            
        </>
    )
}

export default GameData