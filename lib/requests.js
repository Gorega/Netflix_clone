const MDB_URL = "http://api.themoviedb.org/3"
const api_key = "be027be57471a5c67b6018f8805cdba2";

export const requests = {
    fetchDiscoverMovies: `${MDB_URL}/discover/movie?api_key=${api_key}`,
    fetchNowPlayingMovies: `${MDB_URL}/movie/now_playing?api_key=${api_key}`,
    fetchDiscoverTv: `${MDB_URL}/discover/tv?api_key=${api_key}`,
    fetchTopRatedTv: `${MDB_URL}/tv/top_rated?api_key=${api_key}`,
    fetchAiringTodayTv:`${MDB_URL}/tv/airing_today?api_key=${api_key}`,
    fetchPeople:`${MDB_URL}/person/popular?api_key=${api_key}`,
    fetchGernes:`${MDB_URL}/genre/movie/list?api_key=${api_key}`,
    fetchPopularMovies:`${MDB_URL}/movie/popular?api_key=${api_key}`,
    fetchTopRatedMovies:`${MDB_URL}/movie/top_rated?api_key=${api_key}`,

}