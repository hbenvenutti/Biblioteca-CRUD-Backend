declare namespace Express {
  export interface Request {
    user: {
      name: string;
      lastName: string;
      email: string
    }
  }
}
