import { Movie } from 'data/db';

export class MovieListResponse {

  constructor (
    page: number,
    results: Movie[],
    total_results: number,
  ) {
    this.page = page;
    this.results = results;
    this.total_results = total_results;
    this.total_pages = Math.ceil(total_results / 10);
  }

  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;

}