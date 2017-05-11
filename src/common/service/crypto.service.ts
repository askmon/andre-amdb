import { Service, Inject } from 'typedi';
import * as crypto from 'crypto';

export const CRYPTO_SALT: string = 'CRYPTO_SALT';

@Service()
export class CryptoService {

  constructor(
    @Inject(CRYPTO_SALT) private cryptoSalt: string
  ) {}

  generateHash(value: string): string {
    return crypto
      .createHash('sha256')
      .update(this.cryptoSalt + value)
      .digest('base64')
  }

}