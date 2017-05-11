import { Body, Post, JsonController, UseBefore, Get, Param, QueryParam, Res } from 'routing-controllers';
import { Service, Inject, Container } from 'typedi';
import { Response } from 'express';
import { Connection } from 'typeorm';
import { Validator } from 'class-validator';

import { MovieCrudUseCase } from 'use-case';
import { MovieRequest, UserAuthenticationRequest } from 'request';
import { RequestValidationError, JwtService, CustomError } from 'common';
import { JwtMiddleware } from './middleware/jwt.middleware'
import { Movie } from "data/db";
import { MovieListResponse } from "request/movie-list.response";

@Service()
@JsonController()
@UseBefore(JwtMiddleware)
export class MovieController {

  constructor(
    private movieCrudUseCase: MovieCrudUseCase,
    private jwtService: JwtService,
    private validator: Validator
  ) {}

  @Post('/movie')
  async create(@Body() movieRequest: MovieRequest) {
    let errors = await this.validator.validate(movieRequest, {skipMissingProperties: true});
    if (errors.length) {
      throw new RequestValidationError(errors);
    }
    else {
      return this.movieCrudUseCase.create(movieRequest);
    }
  }

  @Get('/movies/popular')
  async listPopular(@QueryParam('page') page): Promise<MovieListResponse> {
    if(!page) {
      page = 1;
    }
    //TODO: number of movies per page should be an env var
    let [movies, count] = await this.movieCrudUseCase.listByPopularity(page, 10);
    return new MovieListResponse(page, movies, count);
  }

  @Get('/movie/:id')
  get(
    @Param("id") id: number,
    @Res() response: any
  ): Promise<Movie> {
    if(isNaN(id)) {
      throw new CustomError('invalid id', 400);
    }
    return this.movieCrudUseCase.get(id);
  }

  @Get('/search/movie')
  async search(
      @QueryParam('page') page: number,
      @QueryParam('query') query: String): Promise<MovieListResponse> {
        if(!page) {
          page = 1;
        }
        let [movies, count] = await this.movieCrudUseCase.searchMoviesList(page, 10, query);
        return new MovieListResponse(page, movies, count);
      }

}
