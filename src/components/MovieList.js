import React from "react";
export default function MovieList(props) {
    const {movies, removeMovie, changeStatus, todosRef} = props;
    const handleClick = id => {
        removeMovie(id);
    };
    const changeWatchStatus = id => {
        changeStatus(id);
    };

    return (
        <ul className="todos" ref={todosRef}>
            {
                movies.map(movie => (
                    <li key={movie.id} >
                        <input id={movie.id} type="checkbox" onChange={() => changeWatchStatus(movie.id)} checked={movie.isWatched} />
                        <label htmlFor={movie.id}>
                            <span className="check"/>{movie.movieName}
                        </label>
                        <i onClick={() => handleClick(movie.id)} className="far fa-trash-alt delete"/>
                    </li>
                ))
            }
        </ul>
    );
}