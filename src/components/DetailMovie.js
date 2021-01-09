import React, { useEffect, useState } from "react";
import axios from "../axios";
import { API_KEY } from "../requests";
import { baseImageURL } from "../requests";
import RowMovies from "./RowMovies";

import "./DetailMovie.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMoney } from "../redux/money/money-action";
import { setCurrentOwnedMovies } from "../redux/movies/movies-action";

function DetailMovie(props) {
  const id = props.location.pathname.slice(
    1,
    props.location.pathname.indexOf("-")
  );

  const currentOwnedMovies = useSelector(
    (state) => state.moviesReducer.currentOwnedMovies
  );
  const currentMoney = useSelector((state) => state.money.currentMoney);
  const dispatch = useDispatch();

  const [movie, setMovie] = useState([]);
  const [casts, setCasts] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState(false);

  const [buyButtonText, setBuyButtonText] = useState("Buy");

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

  const getPrice = () => {
    const rating = movie.vote_average;
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

  const handlePurchase = (movieId, price) => {
    let newMoney = currentMoney - getPrice();

    if (newMoney >= 0) {
      let newOwnedMovies = [...currentOwnedMovies];
      newOwnedMovies.push(movie.id);
      dispatch(setCurrentMoney(newMoney));
      dispatch(setCurrentOwnedMovies([...newOwnedMovies]));
      alert(
        `Purchase on Movie: ${movie.title || movie.name} for Rp${getIdrPrice(
          getPrice()
        )} was successful!`
      );
    } else {
      alert("Purchase was unsuccesful, you have insufficient funds.");
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    async function fetchData() {
      const requestMovie = await axios.get(`/movie/${id}?api_key=${API_KEY}`);
      const requestCasts = await axios.get(
        `/movie/${id}/credits?api_key=${API_KEY}`
      );
      const requestMovieTrailer = await axios.get(
        `/movie/${id}/videos?api_key=${API_KEY}`
      );
      setMovie(requestMovie.data);
      setCasts(requestCasts.data.cast.slice(0, 5));
      try {
        setMovieTrailer(requestMovieTrailer.data.results[0].key);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [props.location.pathname.slice(1, props.location.pathname.indexOf("-"))]);

  return (
    <div className="detail-movie container-fluid">
      <div className="detail-movie-main">
        <img
          src={`${baseImageURL}${movie.poster_path}`}
          alt="Movie Poster"
          className="detail-movie-image"
        />
        <div className="detail-movie-desc">
          <div className="detail-movie-header">
            <div className="detail-movie-header-left">
              <span className="detail-movie-title">
                {movie.title || movie.name}
              </span>
              <div className="detail-movie-oval">
                <p className="detail-movie-rating">{movie.vote_average}</p>
              </div>
              <span className="detail-movie-runtime">{movie.runtime}m</span>
            </div>
            <div className="detail-movie-header-right">
              <span className="detail-movie-release-date">
                Release Date: {movie.release_date}
              </span>

              {!currentOwnedMovies.includes(movie.id) ? (
                <button
                  className="detail-movie-buy"
                  id="buy-button-id"
                  onMouseEnter={() => setBuyButtonText(getIdrPrice(getPrice()))}
                  onMouseLeave={() => setBuyButtonText("Buy")}
                  onClick={() => handlePurchase()}>
                  {buyButtonText}
                </button>
              ) : (
                <button
                  className="detail-movie-buy detail-movie-owned"
                  id="buy-button-id">
                  Owned
                </button>
              )}
            </div>
          </div>

          <div className="detail-movie-overview">{movie.overview}</div>
          <br />
          <span className="detail-movie-title">Casts</span>
          <br />
          <br />
          <div className="detail-movie-casts">
            {casts.map((cast) => {
              return (
                <div
                  className="detail-movie-cast"
                  key={`cast-image-${cast.name}`}>
                  <img
                    src={`${baseImageURL}${cast.profile_path}`}
                    alt="Cast"
                    className="detail-movie-cast-img"
                  />
                  <p className="detail-movie-cast-name">{cast.name}</p>
                  <span className="detail-movie-cast-character">
                    {cast.character}
                  </span>
                </div>
              );
            })}
          </div>
          <br />
          <br />
        </div>
      </div>
      <span className="detail-movie-title">Trailer</span>
      <br />
      <br />
      <iframe
        title="movie-trailer"
        width="100%"
        height={window.innerHeight * 0.7}
        src={`https://www.youtube.com/embed/${movieTrailer}`}></iframe>
      <br />
      <br />

      <RowMovies
        title="Related Movies"
        fetchURL={`/movie/${movie.id}/similar?api_key=${API_KEY}`}
      />

      <RowMovies
        title="Recommended Movies"
        fetchURL={`/movie/${movie.id}/recommendations?api_key=${API_KEY}`}
      />
    </div>
  );
}

export default DetailMovie;
