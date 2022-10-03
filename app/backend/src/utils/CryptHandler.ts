import { compareSync } from 'bcryptjs';

export default class CryptHandler {
  public static Compare(value: string, hash: string): boolean {
    return compareSync(value, hash);
  }
}
