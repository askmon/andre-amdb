import { Service, Inject } from 'typedi';
import * as request from 'supertest';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { E2ETest } from './e2e.test';
import { MovieDataSource } from 'data/db';

@Service()
export class MovieTest extends E2ETest {

  constructor(
    private MovieDataSource: MovieDataSource
  ) {
    super();
  }

  async register(app: any): Promise<any> {

    let agent = request(app);

    describe('Movie', () => {

      describe('Create', () => {

        let payload = null;

        beforeEach(async () => {
          await this.refreshAuth(app);
          payload = {
            'adult': false,
            'backdrop_path': '/AplR1QRswlXiM65GoifX8sDadME.jpg',
            'belongs_to_collection': null,
            'budget': 4000000,
            'homepage': '',
            'id': 213,
            'imdb_id': 'tt0053125',
            'original_language': 'en',
            'original_title': 'North by Northwest',
            'overview': 'Advertising man Roger Thornhill is mistaken for a spy, triggering a deadly cross-country chase.',
            'popularity': 2.394984,
            'poster_path': '/aNV789h3oHm2pTHK5Bdq5RuiumZ.jpg',
            'release_date': '1959-07-08',
            'revenue': 13275000,
            'runtime': 136,
            'status': 'Released',
            'tagline': "It's a deadly game of 'tag' and Cary Grant is 'it'...",
            'title': 'North by Northwest',
            'video': false,
            'vote_average': 7.8,
            'vote_count': 853
          };
        });

        it('should return 200 if payload is correct', async () => {
          let response = await this.post(app, '/movie', payload);
          expect(response.body).to.be.empty;
        });

        it('should return error 401 if authorization header is not present', async () => {
          this.removeAuth();
          let response = await this.post(app, '/movie', payload, 401);
        });

        ['adult',
        'budget',
        'homepage',
        'imdb_id',
        'original_language',
        'original_title',
        'overview',
        'release_date',
        'revenue',
        'title'].forEach( (item) => {
          it(`should return error 400 if "${item}" is not present`, async () => {
            delete payload[item];
            let response = await this.post(app, '/movie', payload, 400);
          });
        });

      });

      describe('Get', () => {

        beforeEach(async () => {
          await this.refreshAuth(app);
        });

        it('should return 200 if payload is correct', async () => {
          let response = await this.get(app, '/movie/1');
          expect(response.body).to.not.be.empty;
        });

        it('should return error 401 if authorization header is not present', async () => {
          this.removeAuth();
          let response = await this.get(app, '/movie/1', 401);
        });

      });

      describe('List Popular', () => {

        beforeEach(async () => {
          await this.refreshAuth(app);
        });

        it('should return 200 if payload is correct', async () => {
          let response = await this.get(app, '/movies/popular?page=3');
          expect(response.body).to.not.be.empty;
          expect(response.body.page).to.equal(3);
          expect(response.body.total_pages).to.equal(4);
          expect(response.body.total_results).to.equal(35);
        });

        it('should return 200 if payload is correct and page is not specified', async () => {
          let response = await this.get(app, '/movies/popular');
          expect(response.body).to.not.be.empty;
          expect(response.body.page).to.equal(1);
          expect(response.body.total_pages).to.equal(4);
          expect(response.body.total_results).to.equal(35);
        });

        it('should return error 401 if authorization header is not present', async () => {
          this.removeAuth();
          let response = await this.get(app, '/movies/popular', 401);
        });

      });

      describe('Search', () => {

        beforeEach(async () => {
          await this.refreshAuth(app);
        });

        it('should return 200 if payload is correct', async () => {
          let response = await this.get(app, '/search/movie?query=star&page=3');
          expect(response.body).to.not.be.empty;
          expect(response.body.page).to.equal(3);
          expect(response.body.total_pages).to.equal(4);
          expect(response.body.total_results).to.equal(35);
        });

        it('should return 200 if payload is correct and page is not specified', async () => {
          let response = await this.get(app, '/search/movie?query=star');
          expect(response.body).to.not.be.empty;
          expect(response.body.page).to.equal(1);
          expect(response.body.total_pages).to.equal(4);
          expect(response.body.total_results).to.equal(35);
        });

        it('should return error 401 if authorization header is not present', async () => {
          this.removeAuth();
          let response = await this.get(app, '/search/movie?query=star', 401);
        });

      });
    });

  }
}