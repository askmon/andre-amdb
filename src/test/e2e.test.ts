import * as request from 'supertest';
import { expect } from 'chai';

export class E2ETest {

  protected token: string = null;

  protected async refreshAuth(app: any): Promise<string> {
    let response = await this.post(app, '/user/authenticate', {'username': 'test', 'password': 'test'});
    expect(response.body.token).to.not.empty;
    this.token = `Bearer ${response.body.token}`;
    return this.token;
  }

   protected removeAuth(): void {
    this.token = null;
  }

  protected async post(app: any, path: string, body: any, expectedStatus: number = 200): Promise<any> {
    let agent = request(app).post(path);
    if (this.token) {
      agent.set('Authorization', this.token);
    }
    return await agent.send(body).expect(this.checkStatus(expectedStatus));
  }

  protected async get(app: any, path: string, expectedStatus: number = 200): Promise<any> {
    let agent = request(app).get(path);
    if (this.token) {
      agent.set('Authorization', this.token);
    }
    return await agent.expect(this.checkStatus(expectedStatus));
  }

  protected checkStatus(expectedStatus: number): Function {
    let assertion = (res: any): void => {
      expect(res.statusCode).to.equal(expectedStatus, `Response status does not match for ${res.req.method} ${res.req.path}`);
    };
    return assertion;
  }
}