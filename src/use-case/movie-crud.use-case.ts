import { Service } from 'typedi';
import { Repository } from "typeorm";

import { Movie } from 'data/db/entity';
import { NotFoundError, CryptoService } from 'common';
import { MovieRequest } from 'request';
import { MovieDataSource } from 'data/db';
import { MovieRepository } from 'data/repository'

@Service()
export class MovieCrudUseCase {
  constructor(
    private movieDataSource: MovieDataSource,
    private movieRepository: MovieRepository,
    private cryptoService: CryptoService
  ) {}

  async create(movieRequest: MovieRequest): Promise<any> {

    let movie = this.mapMovieRequest(movieRequest);

    movie = await this.movieDataSource.create(movie);

    return {};
  }

  mapMovieRequest(movieRequest: MovieRequest): Movie {
    //TODO: Remove this map and use the entity both for DB and request validation
    //(make integration between typeorm and routing-controllers work)
    //TODO: Store the whole object of belongs_to_collection (embedable typeorm class)
    movieRequest.belongs_to_collection = JSON.stringify(movieRequest.belongs_to_collection);
    let movie = new Movie();
    for(let key in movieRequest) movie[key]=movieRequest[key];
    return movie;
  }

  async get(movieId: number): Promise<Movie> {
    const movie = await this.movieRepository.get(movieId);
    return movie;
  }

  async listByPopularity(page: number, resultsPerPage: number): Promise<any> {
    //TODO: All methods should use the repository
    let [movies, count] = await this.movieDataSource.listByPopularity(
      page,
      resultsPerPage);

    if (!movies) {
      throw new NotFoundError();
    }

    return [movies, count];
  }

  async searchMoviesList(page: number, resultsPerPage: number, query: String): Promise<any> {
    let [movies, count] = await this.movieDataSource.searchMovies(
      page,
      resultsPerPage,
      query);

    if (!movies) {
      throw new NotFoundError();
    }

    return [movies, count];
  }

}
