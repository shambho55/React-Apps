import React from 'react';
import { useState, useEffect } from 'react';
// fac73924

import MovieCard from './MovieCard';

import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=fac73924";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [SearchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies("Iron Man");
    }, [])

    return (
        <div className='app'>
            <h1>MovieBath</h1>

            <div className='search'>
                <input
                    placeholder='Search for Movies'
                    value={SearchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(SearchTerm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className='container'>
                            {movies.map((movie) => (
                                <MovieCard movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <div className='empty'>
                            <h2>No movies found</h2>
                        </div>
                    )
            }
        </div>
    );
}

export default App;