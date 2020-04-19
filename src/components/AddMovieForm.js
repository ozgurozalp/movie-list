import React, { useState } from 'react';
export default function AddMovieForm(props) {
    const [movieName, setMovieName] = useState("");
    const {addMovie} = props;
    const handleClick = () => {
        if (movieName.length > 0) {
            const movieData = {
                movieName,
                id : (new Date()).getTime(),
                isWatched : false
            }
            addMovie(movieData);
            setMovieName("");
        }
    };
    const handleKeyPress = e => {
        if (e.key === "Enter") {
            handleClick();
        }
    };
    const changeMovieName = e => {
        setMovieName(e.target.value);
    };
    return (
        <form className="add" onSubmit={e => e.preventDefault()}>
            <input autoComplete={"off"}
                   autoFocus
                   type="text"
                   name="add"
                   value={movieName}
                   onChange={changeMovieName}
                   onKeyPress={handleKeyPress}
                   placeholder="Yeni bir film ekle..."/>
            <div className="input-buttons" onClick={handleClick}>
                <i className="fas fa-plus add"/>
            </div>
        </form>
    );
}