import React, { useEffect, useState } from "react";

import "./RowMovies.css";

import axios from "../axios";
import { Link } from "react-router-dom";
import { baseImageURL } from "../requests";
import { useSelector } from "react-redux";

function RowMovies({ title, fetchURL }) {
  const [movies, setMovies] = useState([]);

  const currentOwnedMovies = useSelector(
    (state) => state.moviesReducer.currentOwnedMovies
  );

  const getIdrPrice = (price) => {
    if (price !== undefined) {
      let str_price = price.toString().split("").reverse().join("");
      let str_price_idr = "";
      let counter = 1;
      let len = str_price.length;
      for (let char in str_price) {
        str_price_idr += str_price[char];
        if (counter == 3 && char != len - 1) {
          counter = 0;
          str_price_idr += ".";
        }
        counter++;
      }
      return str_price_idr.split("").reverse().join("");
    }
    return undefined;
  };

  const getPrice = (index) => {
    const rating = movies[index].vote_average;
    let price;
    if (rating >= 1 && rating < 3) {
      price = 3500;
    } else if (rating >= 3 && rating < 6) {
      price = 8250;
    } else if (rating >= 6 && rating < 8) {
      price = 16350;
    } else if (rating >= 8 && rating < 10) {
      price = 21250;
    }
    return price;
  };

  const stripTitle = (title) => title.split(" ").join("-");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  return movies.length !== 0 ? (
    <div className="row-movies">
      <h2 className="row-movies-category">{title}</h2>

      <div className="row-movies-posters">
        {movies.map((movie, index) => {
          return (
            <div key={movie.id} id={movie.id} className="row-movies-poster">
              <div className="row-movies-main">
                <Link
                  to={{
                    pathname: `/${movie.id}-${stripTitle(
                      movie.title || movie.name
                    )}`,
                    state: { id: movie.id },
                  }}
                  className="row-movies-link">
                  <img
                    src={`${baseImageURL}${movie.poster_path}`}
                    alt="Movie"
                    className="row-movies-image"
                  />
                  {currentOwnedMovies.includes(movie.id) && (
                    <div className="row-movies-owned">
                      <p className="row-movies-owned-text">Owned</p>
                    </div>
                  )}
                </Link>
              </div>
              <Link
                to={{
                  pathname: `/${movie.id}-${stripTitle(
                    movie.title || movie.name
                  )}`,
                  state: { id: movie.id },
                }}
                className="row-movies-link">
                <div className="row-movies-desc">
                  <p className="row-movies-title">
                    {movie.title || movie.name}
                  </p>
                  <p className="row-movies-price">
                    Rp {getIdrPrice(getPrice(index))}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default RowMovies;
