import { hash, compare } from 'bcryptjs';

import { HashProviderInterface } from '@shared:containers/providers/hash/Hash.provider.interface';

// ---------------------------------------------------------------------------------------------- //

export class BcryptProvider implements HashProviderInterface {
  async hash(string: string): Promise<string> {
    return hash(string, 12);
  }

  async compare(string: string, hash: string): Promise<boolean> {
    return compare(string, hash);
  }
}
