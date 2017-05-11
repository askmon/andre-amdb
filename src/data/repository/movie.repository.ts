import { Service } from 'typedi';

import { MovieDataSource, Movie } from 'data/db';
import { MovieMemcacheDatasource } from 'data/memcache';
import { NotFoundError } from 'common';

//TODO: Transfer all db.datasource methods to repository
@Service()
export class MovieRepository {

  constructor (
    private movieDataSource: MovieDataSource,
    private memcacheMovieDataSource: MovieMemcacheDatasource
  ) {}

  async get(movieId: number): Promise<Movie> {
    let movie = null;
    try {
      movie = await this.memcacheMovieDataSource.get(movieId);
    } catch (error) {
      movie = await this.movieDataSource.get(movieId);
      if (!movie) throw new NotFoundError('Movie not found');
      await this.memcacheMovieDataSource.set(movieId, movie);
    }
    return movie;
  }

}