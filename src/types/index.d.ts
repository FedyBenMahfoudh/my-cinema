export interface Movie {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
    release_date: string;
    original_language: string;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    overview: string;
    popularity: number;
    video: boolean;
}


export interface MovieDetail extends Movie {
  genres: Array<{
    id: number;
    name: string;
  }>;
  tagline: string;
  runtime: number;
  status: string;
  budget: number;
  revenue: number;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
  }>;
  vote_count: number;
}