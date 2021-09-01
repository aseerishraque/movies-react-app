import React, { Component } from 'react';
import Pagination from './paginate.component';
import { getMovies, getGenres } from '../services/movies.service';
import Filter from '../common/filtering.component';

class Movies extends Component {
    state = { 
        movies: getMovies(),
        genres: [{name: 'All Genres'}, ...getGenres()],
        activePage: 1,
        dataCount:10,
        currentItems:[],
        selected_genre:'All Genres',
     }
     setActivePage = (page) => {
        this.setState({activePage: page});
     }
    paginateMovies = () => {
        const { movies, activePage, dataCount } = this.state;
        const start = (activePage-1)*dataCount;
        const updatedMovies = movies.slice(start, start+dataCount);
        return updatedMovies;
    }
    setYourRating = (title) => {
        const movies = [...this.state.movies];
        movies.forEach(item=>{
            if(item.Id === title){
                item.youRating = item.youRating === 1 ? 0 : 1;
                item.rating = item.youRating === 1 ? item.rating+1 : item.rating-1;
            }
        })
        this.setState({...this.state, movies});
    }
    onClickGenre = (name) => {
        this.setState({selected_genre: name});
        const movies = this.state.movies.filter(movie=>{
            const genres = new Set();
            if(Array.isArray(movie.genres)) movie.genres.forEach(g=> genres.add(g));
            const convertedGenres = Array.from(genres);
            if(convertedGenres.map(g=>g===name ? true : false)){
                return true;
            }else{
                return false;
            }
        });
        console.log(movies);
        this.setState({...this.state, movies});
    }
    render() { 
        const {genres} = this.state;
        const movies = this.paginateMovies();
        return ( 
            <>
            <div className="row">
                <div className="col-lg-4">
                    <Filter selected_genre={this.state.selected_genre} onClickGenre={this.onClickGenre} genres={genres}/>
                </div>
                <div className="col-lg-8">
                    <h1>Showing {movies.length} Movies</h1>
                    <br/>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Image</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Your Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((movie, idx)=>{
                            return (
                                <tr key={idx}>
                                <td>{movie.title}</td>
                                <td>
                                <img src={movie.posterurl} className="img-thumbnail" width="10%" alt=""/>
                                </td>
                                <td>
                                    <i className="bi bi-star-fill text-warning"></i>
                                    <span>{movie.imdbRating}</span>
                                </td>
                                <td onClick={()=>this.setYourRating(movie.title)} style={{cursor:'pointer'}}>
                                    <i className={movie.youRating===1 ? 'bi bi-star-fill text-warning' : 'bi bi-star'}></i>
                                </td>
                                </tr> 
                            ) 
                            })}
                        </tbody>
                    </table>
                    <Pagination 
                        total={this.state.movies.length}
                        pageCount={this.state.dataCount}
                        activePage={this.state.activePage}
                        setActivePage={this.setActivePage}
                    />  
                </div>
            </div>
            </>
         );
    }
}
 
export default Movies;