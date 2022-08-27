export const authenticationConfig = {
  expiresIn: '1d',
  secret: process.env.JWT_SECRET as string
};
