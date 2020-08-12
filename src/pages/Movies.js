import React,{Component,usestate} from 'react';
import axios from 'axios';

class Movies extends Component{
    constructor(props){
        super(props);
        this.state = {
            movies : []
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
        return(
            <>
            {this.state.movies.map((el,index)=>{
                return(
                <tr>
                    <td>{el.id}</td>
                    <td>{el.title}</td>
                    <td>{el.description}</td>
                    <td>{el.year}</td>
                    <td>{el.duration}</td>
                    <td>{el.genre}</td>
                    <td>{el.rating}</td>
                    <td>{el.review}</td>
                    <td>{el.image_url}</td>
                </tr>
                )
                
            })}
            </>
        )
    }
}

export default Movies
