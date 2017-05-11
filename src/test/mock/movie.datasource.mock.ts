import { Repository } from 'typeorm';
import { Service } from 'typedi';

import { Movie } from 'data/db/entity';

@Service()
export class MovieDataSourceMock {

  async create(movie: Movie): Promise<Movie> {
    return new Movie();
  }

  async get(movieId: number): Promise<Movie> {
    const movie: Movie = new Movie()
    movie.id = 1;
    return movie;
  }

  async listByPopularity(page: number, resultsPerPage: number): Promise<[Movie[], number]> {
    let movies = [];
    for(let i = 0; i < 10; i++) {
        movies.push(new Movie());
    }
    return [movies, 35];
  }

  async searchMovies(page: number, resultsPerPage: number, query: String): Promise<[Movie[], number]> {
    let movies = [];
    for(let i = 0; i < 10; i++) {
        movies.push(new Movie());
    }
    return [movies, 35];
  }

}
