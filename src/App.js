import React, {useState, useEffect, useRef} from 'react';
import './style/App.scss';
import AddMovieForm from "./components/AddMovieForm";
import MovieList from "./components/MovieList";
import CoverImage from "./components/CoverImage";

export default function App() {
    const [movies, setMovies] = useState([]);
    const todosRef = useRef();

    const addMovie = newMovie => {
        setMovies(prevMovies => [...prevMovies, newMovie]);
        setTimeout(() => {
           todosRef.current.scrollTo(0, todosRef.current.scrollHeight)
        }, 0);
    };

    const removeMovie = id => {
        const copy = movies.filter(movie => movie.id !== id);
        setMovies(copy);
    };

    const changeStatus = id => {
        const copy = [...movies];
        const found = copy.find(movie => movie.id === id);
        if (found) {
            found.isWatched = !found.isWatched;
            setMovies(copy);
        }
    };

    useEffect(() => {
        const moviesFromStorage = localStorage.getItem("movies");
        if (moviesFromStorage)
            setMovies(JSON.parse(moviesFromStorage));
    }, []);

    useEffect(() => {
        localStorage.setItem("movies", JSON.stringify(movies));
    }, [movies]);


    return (
        <div className="todoList">
            <CoverImage />
            <div className="content">
                <AddMovieForm addMovie={addMovie} />
                <MovieList movies={movies} removeMovie={removeMovie} changeStatus={changeStatus} todosRef={todosRef} />
            </div>
        </div>
    );
}

