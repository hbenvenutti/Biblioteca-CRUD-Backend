import { container } from 'tsyringe';

import { BooksRepositoryInterface } from '@books:repositories-interfaces/BooksRepository.interface';
import { BooksRepository } from '@books:infra/firestore/repositories/Books.repository';

// ---------------------------------------------------------------------------------------------- //

container.registerSingleton<BooksRepositoryInterface>('BooksRepository', BooksRepository);
