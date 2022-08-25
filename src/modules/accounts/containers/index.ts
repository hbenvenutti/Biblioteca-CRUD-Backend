import { container } from 'tsyringe';

import { UsersRepositoryInterface } from '@accounts:repositories-interfaces/UsersRepository.interface';
import { UsersRepository } from '@accounts:repositories/Users.repository';

// ---------------------------------------------------------------------------------------------- //

container.registerSingleton<UsersRepositoryInterface>('UsersRepository', UsersRepository);
