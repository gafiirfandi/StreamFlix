export const API_KEY = "23e87452f0ae2ef7c2c734f90d1e6fb1";

export const baseImageURL = "https://image.tmdb.org/t/p/original/";

const requests = {
  // fetchNetflix0riginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  // "Top Rated": `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  // Trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  Action: `/movie/now_playing?api_key=${API_KEY}&region=US&with_genres=28`,
  Comedy: `/movie/now_playing?api_key=${API_KEY}&region=US&with_genres=35`,
  Horror: `/movie/now_playing?api_key=${API_KEY}&region=US&with_genres=27`,
  Romance: `/movie/now_playing?api_key=${API_KEY}&region=US&with_genres=10749`,
  Documentaries: `/movie/now_playing?api_key=${API_KEY}&region=US&with_genres=99`,
};

export default requests;
