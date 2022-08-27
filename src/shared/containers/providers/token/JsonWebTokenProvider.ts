import { sign, verify } from 'jsonwebtoken';

import { TokenData, TokenProviderInterface } from '@shared:providers/token/TokenProvider.interface';
import { authenticationConfig } from '@config/authentication.config';

// ---------------------------------------------------------------------------------------------- //

interface TokenPayload {
  sub: string,
  email: string;
  iat: number;
  exp: number;
}

// ---------------------------------------------------------------------------------------------- //

class JsonWebTokenProvider implements TokenProviderInterface {
  private secret: string = authenticationConfig.secret;
  private expiresIn: string = authenticationConfig.expiresIn;

  sign(data: TokenData): string {
    const { id, email } = data;

    const token = sign({ email }, this.secret, { subject: id, expiresIn: this.expiresIn });

    return token;
  }

  // -------------------------------------------------------------------------------------------- //


  verify(token: string): TokenData {
    const { sub: id, email } = verify(token, this.secret) as TokenPayload;

    return { id, email };
  }
}

// ---------------------------------------------------------------------------------------------- //

export { JsonWebTokenProvider };
