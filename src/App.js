import React, {useState, useEffect, useRef} from 'react';
import './style/App.scss';
import AddMovieForm from "./components/AddMovieForm";
import MovieList from "./components/MovieList";
import CoverImage from "./components/CoverImage";

export default function App() {
    const [movies, setMovies] = useState([]);
    const todosRef = useRef();

    const addMovie = newMovie => {
        const lastForm = movies;
        lastForm.push(newMovie);
        setMovies([...lastForm]);
        localStorage.setItem("movies", JSON.stringify(movies));
        setTimeout(() => {
           todosRef.current.scrollTo(0, todosRef.current.scrollHeight)
        }, 0);
    };
    const removeMovie = id => {
        const lastForm = movies;
        let foundIndex = movies.findIndex(movie => movie.id === id);
        if (foundIndex !== -1) {
            lastForm.splice(foundIndex, 1);
            setMovies([...lastForm]);
            localStorage.setItem("movies", JSON.stringify(movies));
        }
    };
    const changeStatus = id => {
        const lastForm = movies;
        let foundIndex = movies.findIndex(movie => movie.id === id);
        if (foundIndex !== -1) {
            lastForm[foundIndex].isWatched = !lastForm[foundIndex].isWatched;
            setMovies([...lastForm]);
            localStorage.setItem("movies", JSON.stringify(movies));
        }
    };

    useEffect(() => {
        const moviesFromStorage = localStorage.getItem("movies");
        if (moviesFromStorage !== null) {
            setMovies([...JSON.parse(moviesFromStorage)]);
        } else {
            localStorage.setItem("movies", JSON.stringify(movies));
        }
    }, []);



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

