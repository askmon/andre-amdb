import { Repository } from 'typeorm';
import { OrmRepository } from "typeorm-typedi-extensions";
import { Service } from 'typedi';

import { Movie } from 'data/db/entity';
import { CustomError, NotFoundError } from 'common';

@Service()
export class MovieDataSource {

  constructor(@OrmRepository(Movie) private repository: Repository<Movie>) {}

  async create(movie: Movie): Promise<Movie> {
    try {
      return await this.repository.persist(movie);
    } catch (error) {
      throw new CustomError(error.message, 400);
    }
  }

  async get(movieId: number): Promise<Movie> {
    try {
      const movie = await this.repository.findOne({id: movieId});
      if(!movie) {
        throw new NotFoundError('movie not found');
      }
      return movie;
    } catch (error) {
      throw error;
    }
  }

  async listByPopularity(page: number, resultsPerPage: number): Promise<[Movie[], number]> {
    try {
      const firstResult = (page - 1) * resultsPerPage;
      return await this.repository.createQueryBuilder('movie')
        .setFirstResult(firstResult)
        .setMaxResults(resultsPerPage)
        .orderBy('movie.popularity', 'DESC')
        .getManyAndCount();
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

  async searchMovies(page: number, resultsPerPage: number, query: String): Promise<[Movie[], number]> {
    try {
     const firstResult = (page - 1) * resultsPerPage;
     const lastResult = (page - 1) * resultsPerPage + resultsPerPage;
     //TODO: verify if it's SQL injection safe, also see if you can get the count and results with just one query
     const dbQueryString = `SELECT * FROM movie
       WHERE CONCAT (title,original_title,overview,tagline)
       LIKE '%${query}%'
       LIMIT ${firstResult}, ${lastResult};`;
     const countQuery = `SELECT COUNT(*) AS count
       FROM movie
       WHERE CONCAT (title,original_title,overview,tagline)
       LIKE '%${query}%';`;
     const movies = await this.repository.query(dbQueryString);
     const countObject = await this.repository.query(countQuery);
     const count = parseInt(countObject[0]['count'])
     return [movies, count];
    } catch (error) {
      throw new CustomError(error.message, 500);
    }
  }

}
