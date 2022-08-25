export interface HashProviderInterface {
  hash(string: string): Promise<string>
  compare(string: string, hash: string): Promise<boolean>
}
