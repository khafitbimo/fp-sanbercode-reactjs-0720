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
    linkNoUnderline  : {
        textDecoration: "none"
    }
  });

 

class Movies extends Component{
    constructor(props){
        super(props);
        this.state = {
            movies : [],
            searchNodes:""
        }
        
    }

    componentDidMount(){
        this.getMovie();
    }

    getMovie(){
        axios.get(`https://backendexample.sanbersy.com/api/movies`)
            .then(res => {
                res.data.map(el=>{
                    this.setState({
                        movies : [...this.state.movies,{
                            id : el.id,
                            title : el.title,
                            description : el.description,
                            year : el.year,
                            duration : el.duration,
                            genre : el.genre,
                            rating : el.rating,
                            review : el.review,
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
            <Typography component="h2" variant="h4" color="primary" gutterBottom>Movies</Typography>
            {this.state.movies.map((el,index)=>{
                return(
                    
                    <Grid item xs={12} key={index}>
                    <CardActionArea component={LinkRouter}  to={`/movies/${el.id}`}>
                        <Card className={classes.card}>
                        <div className={classes.cardDetails}>
                            <CardContent>
                            <Typography component="h2" variant="h5" color='primary'>
                                {el.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {el.year}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {el.genre}
                            </Typography>
                            <Typography variant="subtitle1" color="secondary" className={classes.linkNoUnderline} >
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

export default withStyles(styles, { withTheme: true })(Movies);
