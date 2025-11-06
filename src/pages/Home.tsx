import { useEffect, useState } from "react";
import type { Movie } from "../types";
import { getMovies } from "../services/movie.service";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import Search from "../components/Search";
import { useDebounce } from "react-use";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  useEffect(() => {
    const fetchMovies = async (query: string = "") => {
      setIsLoading(true);
      try {
        const fetchedMovies = await getMovies(query);
        if (fetchedMovies) {
          setMovies(fetchedMovies);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setErrorMessage(
          error instanceof Error ? error.message : "Unknown error"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>

          {/* Search Bar */}
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2>All Movies</h2>

          {/* Movie List */}

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Spinner />
            </div>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : movies.length ? (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center min-h-[200px]">
              <h2 className="text-gradient text-shadow-white">
                No movies found with name "{debouncedSearchTerm}"
              </h2>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Home;
