import React from "react";
import { useHistory, NavLink } from "react-router-dom";

export default function SavedList(props) {
  let history = useHistory();
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {props.list.map((movie) => (
        <NavLink
          to={`/movies/${movie.id}`}
          key={movie.id}
          className="saved-movie"
        >
          {movie.title}
        </NavLink>
      ))}
      <div className="home-button" onClick={() => history.push("/")}>
        Home
      </div>
    </div>
  );
}
