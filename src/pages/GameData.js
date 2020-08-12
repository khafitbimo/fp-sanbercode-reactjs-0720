import React, {useContext,useState,useEffect, Fragment} from 'react'
import axios from 'axios'
import { makeStyles, Table, TableHead, TableRow, TableCell, TableBody, Button,Modal,Backdrop,Fade, 
    FormControlLabel,InputLabel,Input,FormHelperText,Grid,TextField,Checkbox,Link  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import PlusIcon from '@material-ui/icons/Add'
import Title from '../layout/Title';

const GameData = ()=>{
    const [apiGame] = useState('https://backendexample.sanbersy.com/api/games')
    const [games,setGames] = useState(null);
    const [inputGame,setInputGame] = useState({
        id: 0,
        created_at: "",
        updated_at: "",
        title: "",
        description: "",
        year: (new Date()).getFullYear(),
        duration: 0,
        genre: "",
        rating: 0,
        image_url: ""
    })

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
                    id: el.id,
                    created_at: el.created_at,
                    updated_at: el.updated_at,
                    title: el.title,
                    description: el.description,
                    year: el.year,
                    duration: el.duration,
                    genre: el.genre,
                    rating: el.rating,
                    image_url: el.image_url
                }
            }))
          })
        }
      }, [games])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputGame.title.replace(/\s/g,'') === '') {
            return
        }

        if(statusForm === 'create'){
            axios.post(apiGame,{
                created_at : new Date(),
                title : inputGame.title,
                description : inputGame.description,
                year : parseInt(inputGame.year),
                duration : parseInt(inputGame.duration),
                genre : inputGame.genre,
                rating : parseInt(inputGame.rating),
                review : inputGame.review,
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
                title : inputGame.title,
                description : inputGame.description,
                year : parseInt(inputGame.year),
                duration : parseInt(inputGame.duration),
                genre : inputGame.genre,
                rating : parseInt(inputGame.rating),
                review : inputGame.review,
                image_url : inputGame.image_url
        })
        .then(res => {
            let selectedGame = games.find(el=> el.id === selectedId)
            selectedGame.title = inputGame.title
            selectedGame.description = inputGame.description
            selectedGame.year = inputGame.year
            selectedGame.duration = inputGame.duration
            selectedGame.genre = inputGame.genre
            selectedGame.rating = inputGame.rating
            selectedGame.review = inputGame.review
            selectedGame.image_url = inputGame.image_url
            setGames([...games])
        }).catch(error => {
            console.log(error)
        })
        }

        setStatusForm("create")
        setSelectedId(0)
        setInputGame({
            title: "",
            description: "",
            year: (new Date()).getFullYear(),
            duration: 0,
            genre: "",
            rating: 0,
            review: "",
            image_url: ""
        })
        setOpen(false)

    }

    const handleChange = (event) => {
        let typeOfInput = event.target.name
        

        switch (typeOfInput) {
            case "title":
                setInputGame({...inputGame, title: event.target.value});
                break;
            case "description":
                setInputGame({...inputGame, description: event.target.value});
                break;
            case "year":
                setInputGame({...inputGame, year: event.target.value});
                break;
            case "duration":
                setInputGame({...inputGame, duration: event.target.value});
                break;
            case "genre":
                setInputGame({...inputGame, genre: event.target.value});
                break;
            case "rating":
                setInputGame({...inputGame, rating: event.target.value});
                break;
            case "review":
                setInputGame({...inputGame, review: event.target.value});
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
                title: selectGame.title !== null ? selectGame.title : '' ,
                description: selectGame.description !== null ? selectGame.description : '',
                year: selectGame.year !== null ? selectGame.year : (new Date()).getFullYear(),
                duration: selectGame.duration !== null ? selectGame.duration : 120,
                genre: selectGame.genre !== null ? selectGame.genre : '',
                rating: selectGame.rating !== null ? selectGame.rating : 0,
                review: selectGame.review !== null ? selectGame.review : '',
                image_url: selectGame.image_url !== null ? selectGame.image_url : '',
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

    const ModalForm = () => {
        return(
            <>
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
                    <Title>Game Form</Title>
                    <form onSubmit={handleSubmit} className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <TextField
                                name="title"
                                variant="outlined"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                autoFocus
                                value={inputGame.title}
                                onChange={handleChange}
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="year"
                                label="Year"
                                type="number"
                                name="year"
                                value={inputGame.year}
                                onChange={handleChange}
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="duration"
                                type="number"
                                label="Duration"
                                id="duration"
                                value={inputGame.duration}
                                onChange={handleChange}
                            />
                            </Grid>
                            <Grid item xs={12} sm={6}>
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
                                name="rating"
                                type="number"
                                label="Rating"
                                id="rating"
                                value={inputGame.rating}
                                onChange={handleChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                value={inputGame.description}
                                onChange={handleChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="review"
                                label="Review"
                                name="review"
                                value={inputGame.review}
                                onChange={handleChange}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="image_url"
                                label="Image"
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



    return(
        <>
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Title>Game List</Title>
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
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Genre</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Review</TableCell>
                        <TableCell>Image Url</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        games !== null && games.map((item,index)=>{
                            return(
                                <TableRow key={index}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.year}</TableCell>
                                    <TableCell>{item.duration}</TableCell>
                                    <TableCell>{item.genre}</TableCell>
                                    <TableCell>{item.rating}</TableCell>
                                    <TableCell>{item.review}</TableCell>
                                    <TableCell>{item.image_url}</TableCell>
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
        <ModalForm/>
        </>
    )
}

export default GameData