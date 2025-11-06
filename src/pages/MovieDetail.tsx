import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { MovieDetail } from "../types";
import { getMovieById } from "../services/movie.service";
import Spinner from "../components/Spinner";
import { formatCurrency, formatRuntime } from "../lib/utils";
import { ArrowLeft, Calendar, Clock, Languages } from "lucide-react";

export const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        const fetchedMovie = await getMovieById(id as string);
        setMovie(fetchedMovie);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setErrorMessage(
          error instanceof Error ? error.message : "Unknown error"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{errorMessage}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-gradient text-shadow-white">Movie not found</h2>
      </div>
    );
  }

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 mb-6 bg-dark-100 rounded-lg text-white shadow-light-100/10 hover:bg-dark-100/70 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
        <div className="bg-dark-100 rounded-2xl p-8 shadow-inner shadow-light-100/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Poster */}
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt={movie?.title}
                className="w-full rounded-lg shadow-xl"
              />
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Title and Tagline */}
              <div>
                <h1 className="text-4xl md:text-5xl text-left leading-tight">
                  {movie?.title}
                </h1>
                {movie?.tagline && (
                  <p className="text-gradient text-xl mt-2 italic">
                    "{movie.tagline}"
                  </p>
                )}
              </div>

              {/* Quick Info */}
              <div className="flex items-center gap-4 justify-between">
                <div className="flex items-center gap-4 flex-wrap">
                  {movie?.runtime && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-light-100/10 rounded-lg">
                      <Clock className="w-4 h-4 text-white" />
                      <span className="text-white text-sm">
                        {formatRuntime(movie.runtime)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-light-100/10 rounded-lg">
                    <Languages className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">
                      {movie?.original_language.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-light-100/10 rounded-lg">
                    <Calendar className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">
                      {new Date(movie?.release_date || "").getFullYear()}
                    </span>
                  </div>
                  {movie?.adult && (
                    <span className="px-2 py-1 bg-red-500 rounded-md text-white text-sm">
                      18+
                    </span>
                  )}
                </div>
                <div className="rating text-center">
                  <img src="/star.svg" alt="rating" className="w-8 h-8" />
                  <p className="text-white">{movie?.vote_average.toFixed(1)}</p>
                </div>
              </div>

              {/* Genres */}
              <div className="flex gap-2 flex-wrap">
                {movie?.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-light-100/10 rounded-full text-light-100 text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div className="space-y-4">
                <h2 className="text-xl text-gradient">Overview</h2>
                <p className="text-light-200 leading-relaxed">
                  {movie?.overview}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-100">Status</p>
                  <p className="text-white">{movie?.status}</p>
                </div>
                <div>
                  <p className="text-gray-100">Release Date</p>
                  <p className="text-white">
                    {new Date(movie?.release_date || "").toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-100">Budget</p>
                  <p className="text-white">
                    {formatCurrency(movie?.budget || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-100">Revenue</p>
                  <p className="text-white">
                    {formatCurrency(movie?.revenue || 0)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-100">Popularity</p>
                  <p className="text-white">{movie?.popularity.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-gray-100">Vote Count</p>
                  <p className="text-white">{movie?.vote_count}</p>
                </div>
              </div>

              {/* Production Companies */}
              {movie?.production_companies &&
                movie.production_companies.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xl text-gradient">
                      Production Companies
                    </h2>
                    <div className="flex gap-4 flex-wrap">
                      {movie.production_companies.map((company) => (
                        <div
                          key={company.id}
                          className="bg-light-100/5 px-4 py-2 rounded-lg"
                        >
                          <p className="text-white">{company.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
