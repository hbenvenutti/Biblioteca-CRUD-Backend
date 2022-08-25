import { TokenData, TokenProviderInterface } from '@shared:providers/token/TokenProvider.interface';

export class TokenMockProvider implements TokenProviderInterface {
  sign(data: TokenData): string {
    const { id, email } = data;

    return `token ${id} ${email}`;
  }

  verify(token: string): { id: string; email: string; } {
    const [ , id, email ] = token.split(' ');

    return { id, email };
  }
}
