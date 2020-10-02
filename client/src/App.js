import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import MovieCard from "./Movies/MovieCard";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get("http://localhost:5000/api/movies") // Study this endpoint with Postman
        .then((response) => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
          setMovieList(response.data);
        })
        .catch((error) => {
          console.error("Server Error", error);
        });
    };
    getMovies();
  }, []);

  const addToSavedList = (id) => {
    // This is stretch. Prevent the same movie from being "saved" more than once
    if (!saved.includes(movieList[id])) setSaved([...saved, movieList[id]]);
  };

  return (
    <div>
      <SavedList list={saved} />

      <div>
        <Switch>
          <Route path="/movies/:id">
            <MovieCard addToSavedList={addToSavedList} />
          </Route>
          <Route path="/">
            <MovieList movies={movieList} addToSavedList={addToSavedList} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
