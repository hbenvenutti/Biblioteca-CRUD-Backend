import { HashProviderInterface } from '@shared:containers/providers/hash/Hash.provider.interface';

export class MockHashProvider implements HashProviderInterface {
  async hash(string: string): Promise<string> {
    return string;
  }

  async compare(string: string, hash: string): Promise<boolean> {
    return string === hash;
  }
}
