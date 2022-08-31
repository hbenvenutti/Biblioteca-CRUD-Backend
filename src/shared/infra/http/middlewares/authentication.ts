import { Request, Response, NextFunction } from 'express';

import { ProviderFactory } from '@shared:containers/providers/ProviderFactory';
import { TokenProviderInterface } from '@shared:containers/providers/token/TokenProvider.interface';
import { UsersRepositoryInterface } from '@accounts:repositories-interfaces/UsersRepository.interface';
import { RepositoryFactory } from '@shared:containers/factories/RepositoryFactory';
import { UnauthorizedError } from '@errors/Unauthorized.error';
import { UserMap } from '@accounts:mappers/User.map';

// ---------------------------------------------------------------------------------------------- //

const authentication = async (request: Request, _: Response, next: NextFunction): Promise<void> => {
  const tokenProvider: TokenProviderInterface = new ProviderFactory().tokenProvider;
  const usersRepository: UsersRepositoryInterface = new RepositoryFactory().usersRepository;

  const { authorization } = request.headers;

  if (!authorization) {
    throw new UnauthorizedError();
  }

  const [ , token ] = authorization.split(' ');

  try {
    const { id } = tokenProvider.verify(token);
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new UnauthorizedError();
    }

    request.user = UserMap.toDto(user);

    next();
  }

  catch{
    throw new UnauthorizedError();
  }
};

// ---------------------------------------------------------------------------------------------- //

export { authentication };
