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
