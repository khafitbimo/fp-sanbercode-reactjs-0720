import React, {useContext,useState,useEffect,Fragment} from 'react'
import axios from 'axios'
import { makeStyles, Table, TableHead, TableRow, TableCell, TableBody, Button,Modal,Backdrop,Fade, 
    Grid,TextField,Checkbox,FormControlLabel  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import PlusIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography';
import {GamesContext} from '../context/GamesContext'

const useStyle = makeStyles((theme) => (
    {
        buttonAdd:{
            float:'right'
        },
        
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

const GameData = ()=>{
    const [apiGame,games,setGames,inputGame,setInputGame] = useContext(GamesContext)

    const [selectedId,setSelectedId] = useState(0)
    const [statusForm,setStatusForm] = useState("create")
    const [open, setOpen] = useState(false);
    const [sortType,setSortType] = useState(true) // true : asc , false : desc
    

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
                    multiPlayer : el.multiplayer,
                    platform : el.platform,
                    release : el.release,
                    image_url : el.image_url
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
                multiplayer : inputGame.multiPlayer,
                platform : inputGame.platform,
                release : parseInt(inputGame.year),
                image_url : inputGame.image_url
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
                multiplayer : inputGame.multiPlayer,
                platform : inputGame.platform,
                release : parseInt(inputGame.year),
                image_url : inputGame.image_url
        })
        .then(res => {
            let selectedGame = games.find(el=> el.id === selectedId)
            selectedGame.name = inputGame.name
            selectedGame.genre = inputGame.genre
            selectedGame.singlePlayer = inputGame.singlePlayer
            selectedGame.multiPlayer = inputGame.multiPlayer
            selectedGame.platform = inputGame.platform
            selectedGame.release = inputGame.release
            selectedGame.image_url = inputGame.image_url
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
            singlePlayer : false,
            multiPlayer : false,
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
                setInputGame({...inputGame, singlePlayer: event.target.checked});
                break;
            case "multiPlayer":
                setInputGame({...inputGame, multiPlayer: event.target.checked});
                break;
            case "platform":
                setInputGame({...inputGame, platform: event.target.value});
                break;
            case "release":
                setInputGame({...inputGame, release: event.target.value});
                break;
            case "image_url":
                setInputGame({...inputGame, image_url: event.target.value});
                break;
        
            default:
                break;
        }
    }

    const Action = ({gameId}) => {
        const handleDelete = () => {
            let newGames = games.filter(el => el.id !== gameId)

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
                image_url : selectGame.image_url
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
        setInputGame({
            name : "",
            genre : "",
            singlePlayer : false,
            multiPlayer : false,
            platform : "",
            release : (new Date()).getFullYear(),
            image_url: ""
        })
        setOpen(true);
        
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sortColumn = (field) => {
        setSortType(!sortType)
 
         const sorted = [...games].sort(function(a,b){
             switch (field) {
                 case "name":
                     if (sortType) {
                         return (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0);
                     }else{
                         return (a.name.toUpperCase() < b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() < a.name.toUpperCase()) ? -1 : 0);
                     }
                     
                 case "genre":
                     if (sortType) {
                         return (a.genre.toUpperCase() > b.genre.toUpperCase()) ? 1 : ((b.genre.toUpperCase() > a.genre.toUpperCase()) ? -1 : 0);
                     }else{
                         return (a.genre.toUpperCase() < b.genre.toUpperCase()) ? 1 : ((b.genre.toUpperCase() < a.genre.toUpperCase()) ? -1 : 0);
                     }
                     
                 case "singlePlayer":
                     if (sortType) {
                         return (a.singlePlayer > b.singlePlayer) ? 1 : ((b.singlePlayer > a.singlePlayer) ? -1 : 0);
                     }else{
                         return (a.singlePlayer < b.singlePlayer) ? 1 : ((b.singlePlayer < a.singlePlayer) ? -1 : 0);
                     }
                    
                 case "multiPlayer":
                     if (sortType) {
                         return (a.multiPlayer > b.multiPlayer) ? 1 : ((b.multiPlayer > a.multiPlayer) ? -1 : 0);
                     }else{
                         return (a.multiPlayer < b.multiPlayer) ? 1 : ((b.multiPlayer < a.multiPlayer) ? -1 : 0);
                     }
                     
                 case "platform":
                     if (sortType) {
                         return (a.platform.toUpperCase() > b.platform.toUpperCase()) ? 1 : ((b.platform.toUpperCase() > a.platform.toUpperCase()) ? -1 : 0);
                     }else{
                         return (a.platform.toUpperCase() < b.platform.toUpperCase()) ? 1 : ((b.platform.toUpperCase() < a.platform.toUpperCase()) ? -1 : 0);
                     }
                     
                 case "release":
                     if (sortType) {
                         return (a.release.toUpperCase() > b.release.toUpperCase()) ? 1 : ((b.release.toUpperCase() > a.release.toUpperCase()) ? -1 : 0);
                     }else{
                         return (a.release.toUpperCase() < b.release.toUpperCase()) ? 1 : ((b.release.toUpperCase() < a.release.toUpperCase()) ? -1 : 0);
                     }
                     
             
                 default:
                     break;
             }
         })
 
           setGames(sorted);
       }

       const handleSearch = (event) => {
        let strSearch = event.target.value

        axios.get(apiGame)
          .then(res => {

            let findGames = res.data.filter(o => o.name.toLowerCase().includes(strSearch.toLowerCase())
                                                || o.release.toString().toLowerCase().includes(strSearch.toLowerCase())
                                                || o.genre.toLowerCase().includes(strSearch.toLowerCase())
                                                || o.platform.toString().toLowerCase().includes(strSearch.toLowerCase())
            )

            setGames(findGames.map(el=>{ 
                return {
                    id : el.id,
                    created_at : el.created_at,
                    updated_at : el.updated_at,
                    name : el.name,
                    genre : el.genre,
                    singlePlayer : el.singlePlayer,
                    multiPlayer : el.multiplayer,
                    platform : el.platform,
                    release : el.release,
                    image_url : el.image_url
                }
            }))
          })
    }

    return(
        <>
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <Typography component="h2" variant="h4" color="primary" gutterBottom>Game Table</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button 
                    variant='outlined' 
                    color='inherit' 
                    className={classes.buttonAdd}
                    onClick={()=>handleOpen('create')}><PlusIcon/></Button>
                </Grid>
                <Grid item xs={12} sm={8} lg={8}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="search"
                        label="Search"
                        name="search"
                        onChange={handleSearch}
                    />
                </Grid>
            </Grid>
            
            
            <Table size='medium'>
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell onClick={()=>sortColumn("name")}>Name</TableCell>
                        <TableCell onClick={()=>sortColumn("genre")}>Genre</TableCell>
                        <TableCell onClick={()=>sortColumn("singlePlayer")}>Single Player</TableCell>
                        <TableCell onClick={()=>sortColumn("multiPlayer")}>Multi Player</TableCell>
                        <TableCell onClick={()=>sortColumn("platform")}>Platform</TableCell>
                        <TableCell onClick={()=>sortColumn("release")}>Release</TableCell>
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
                <Typography component="h2" variant="h4" color="primary" gutterBottom >Game Form</Typography>
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
                            <FormControlLabel
                                value="end"
                                control={
                                    <Checkbox
                                        variant="outlined"
                                        fullWidth
                                        name="singlePlayer"
                                        id="singlePlayer"
                                        checked={inputGame.singlePlayer}
                                        onChange={handleChange}
                                    />
                                }
                                label="Single Player"
                                labelPlacement="end"
                            />
                            
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                value="end"
                                control={
                                    <Checkbox
                                        variant="outlined"
                                        fullWidth
                                        id="multiPlayer"
                                        name="multiPlayer"
                                        checked={inputGame.multiPlayer}
                                        onChange={handleChange}
                                    />
                                }
                                label="Multi Player"
                                labelPlacement="end"
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
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="image_url"
                                label="Image Url"
                                name="image_url"
                                value={inputGame.image_url}
                                onChange={handleChange}
                            />
                            </Grid>
                            <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            >
                                {statusForm === 'create' ? 'Save' : 'Update'}
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