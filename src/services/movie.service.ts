import { API_OPTIONS, IMDB_API } from "../lib/api";
import type { MovieDetail } from "../types";

export const getMovies = async (searchTerm: string) => {
  const endpoint = searchTerm
    ? IMDB_API.API_BASE_URL +
      `/search/movie?query=${encodeURIComponent(searchTerm)}`
    : IMDB_API.API_BASE_URL + `/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, API_OPTIONS);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  if (data.Response === "False") {
    return;
  }

  return data.results;
};

export const getMovieById = async (id: string): Promise<MovieDetail> => {
  const response = await fetch(
    `${IMDB_API.API_BASE_URL}/movie/${id}`,
    API_OPTIONS
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }

  const data = await response.json();
  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found");
  }
  return data;
};


export const getUpcomingMovies = async () => {
    const endpoint = IMDB_API.API_BASE_URL + `/movie/upcoming`;

    const response = await fetch(endpoint, API_OPTIONS);
    if (!response.ok) {
        throw new Error("Failed to fetch upcoming movies");
    }

    const data = await response.json();
    if (data.Response === "False") {
        throw new Error(data.Error || "No upcoming movies found");
    }
    return data.results;
}