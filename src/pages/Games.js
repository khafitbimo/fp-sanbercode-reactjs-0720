import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import axios from 'axios';
import {Link as LinkRouter} from 'react-router-dom'


const styles = theme => ({
    card: {
      display: 'flex',
      margin: theme.spacing(3)
    },
    cardDetails: {
      flex: 1,
    },
    cardMedia: {
      width: 160,
    },
  });

 

class Games extends Component{
    constructor(props){
        super(props);
        this.state = {
            games : [],
            searchNodes:""
        }
        
    }

    
    componentDidMount(){
        this.getGames();
    }

    getGames(){
        axios.get(`https://backendexample.sanbersy.com/api/games`)
            .then(res => {
                res.data.map(el=>{
                    this.setState({
                        games : [...this.state.games,{
                            id : el.id,
                            name : el.name,
                            genre : el.genre,
                            singlePlayer : el.singlePlayer,
                            multiPlayer : el.multiPlayer,
                            platform : el.platform,
                            release : el.release,
                            image_url : el.image_url
                        }]
                    })
              } )
            })
    }

    render(){
        const { classes } = this.props;
        return(
            <>
            
            {this.state.games.map((el,index)=>{
                return(
                    <Grid item xs={12} key={index}>
                    <CardActionArea component="a" href="#">
                        <Card className={classes.card}>
                        <div className={classes.cardDetails}>
                            <CardContent>
                            <Typography component="h2" variant="h5" color='primary'>
                                {el.name}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {el.genre}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {el.platform}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                {el.release}
                            </Typography>
                            <Typography variant="subtitle1" color="secondary" component={LinkRouter} to={`/games/${el.id}`}>
                                Continue Reading...
                            </Typography>
                            </CardContent>
                        </div>
                        <Hidden xsDown>
                            <CardMedia className={classes.cardMedia} image={el.image_url}  />
                        </Hidden>
                        </Card>
                    </CardActionArea>
                    </Grid>

                )
                
            })}
            </>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Games);
