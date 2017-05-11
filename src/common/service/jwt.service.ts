import { Service, Inject } from 'typedi';
import { sign, verify, decode } from 'jsonwebtoken';

export const JWT_SECRET: string = 'JWT_SECRET';

@Service()
export class JwtService {

  constructor(
    @Inject(JWT_SECRET) private secret: string
  ) { }

  public verify(token: string) {
    try {

      let splitToken = token.replace('Bearer ', '');
      return verify(splitToken, this.secret);

    } catch(err) {
      // console.error('Invalid JWT token: ', err.message);
    }
    return undefined;
  }

  public sign(payload: any): string {
    const expiresIn = 60 * 30;

    let signedToken = sign({data: payload}, this.secret, { expiresIn: expiresIn});
    return signedToken
  }
}