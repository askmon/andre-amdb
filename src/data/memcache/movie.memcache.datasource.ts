import { Service, Inject } from 'typedi';

import { Movie } from '../db';

export const MEMJS_CONNECTION = 'MEMJS_CONNECTION';

@Service()
export class MovieMemcacheDatasource {

  constructor (
    @Inject(MEMJS_CONNECTION) private memjs: any
  ) {}

  async get (movieId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.memjs.get(`movie_${movieId}`, (err, movie) => {
        if (err || !movie) {
          reject();
        } else {
          resolve(JSON.parse(movie.toString()));
        }
      });
    });
  }

  async set (movieId: number, movie: Movie): Promise<any> {
    return new Promise((resolve, reject) => {
      this.memjs.set(`movie_${movieId}`, JSON.stringify(movie), (err, success) => {
        resolve(success);
      });
    });
  }

}