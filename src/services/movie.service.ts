import { API_OPTIONS, IMDB_API } from "../lib/api";

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


