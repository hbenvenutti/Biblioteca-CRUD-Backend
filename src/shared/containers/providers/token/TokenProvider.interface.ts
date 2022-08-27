export type Token = string;

export type TokenData = {
  id: string;
  email: string;
}

export interface TokenProviderInterface {

  sign(data: TokenData): Token;
  verify(token: Token): TokenData;
}
