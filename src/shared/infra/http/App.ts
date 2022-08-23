import 'reflect-metadata';
import 'dotenv/config';
import '@shared:containers/index';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import { AppError } from '@errors/App.error';
import { routes } from '@shared:routes/index.routes';

// ---------------------------------------------------------------------------------------------- //

class App {
  server = express();
  constructor() {
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.server.use((err: Error, request: Request, response: Response, _:NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({ status: 'error', message: err.message });
      }

      if (process.env.NODE_ENV !== 'production') {
        return response.status(500).json({ status: 'error', message: err.message });
      }

      return response.status(500).json({
        status: 'error',
        message: 'internal server error'
      });
    });
  }
}

// ---------------------------------------------------------------------------------------------- //

export default new App().server;
