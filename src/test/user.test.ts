import { Service, Inject } from 'typedi';
import * as request from 'supertest';
import { expect } from 'chai';
import * as sinon from 'sinon';

import { E2ETest } from './e2e.test';
import { UserDataSource } from 'data/db';

@Service()
export class UserTest extends E2ETest {

  constructor(
    private userDataSource: UserDataSource
  ) {
    super();
  }

  async register(app: any): Promise<any> {

    let agent = request(app);

    describe('User', () => {

      describe('Create', () => {

        let payload = null;

        beforeEach(() => {
          payload = {
            'username': 'myuser',
            'email': 'myemail@gmail.com',
            'password': 'mypass'
          };
        });

        it('should return 200 if payload is correct', async () => {
          let response = await this.post(app, '/user/create', payload);
          expect(response.body).to.be.empty;
        });

        ['username', 'email', 'password'].forEach( (item) => {
          it(`should return error 400 if "${item}" is not present`, async () => {
            delete payload[item];
            let response = await this.post(app, '/user/create', payload, 400);
          });
        });

        ['username', 'email', 'password'].forEach( (item) => {
          it(`should return error 400 if "${item}" has the wrong type`, async () => {
            payload[item] = true;
            let response = await this.post(app, '/user/create', payload, 400);
          });
        });
      });

      describe('Authenticate', () => {

        let payload = null;

        beforeEach(() => {
          payload = {
            'username': 'myuser',
            'email': 'myemail@gmail.com',
            'password': 'mypass'
          };
        });

        it('should return 200 if payload is correct and has email and password only', async () => {
          delete payload.username;
          let response = await this.post(app, '/user/authenticate', payload);
          expect(response.body.token).to.not.be.empty;
        });

        it('should return 200 if payload is correct and has username and password only', async () => {
          delete payload.email;
          let response = await this.post(app, '/user/authenticate', payload);
          expect(response.body.token).to.not.be.empty;
        });

        it(`should return error 400 if "password" is not present`, async () => {
          delete payload.password;
          let response = await this.post(app, '/user/authenticate', payload, 400);
        });

        it(`should return error 400 if "email" has the wrong type`, async () => {
          delete payload.username;
          payload.email = true;
          let response = await this.post(app, '/user/authenticate', payload, 400);
        });

        it(`should return error 400 if "username" has the wrong type`, async () => {
          delete payload.email;
          payload.email = true;
          let response = await this.post(app, '/user/authenticate', payload, 400);
        });

        it(`should return error 400 if "password" has the wrong type`, async () => {
          delete payload.email;
          payload.password = true;
          let response = await this.post(app, '/user/authenticate', payload, 400);
        });

        it('should return error 401 if password is wrong', async () => {
          const stub = sinon.stub(this.userDataSource, 'getUserByEmailAndPassword', async (
            email: string,
            password: string) : Promise<any> => {
             return null;
           });
          let response = await this.post(app, '/user/authenticate', payload, 401);
          stub.restore();
        });
      });
    });

  }
}