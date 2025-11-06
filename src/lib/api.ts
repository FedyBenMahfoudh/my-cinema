export const IMDB_API = {
  API_BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: import.meta.env.VITE_TMDB_API_KEY,
};

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${IMDB_API.API_KEY}`,
  },
};
