export class Database<K extends Key> {
  registerUser: (username: string, hash: string, salt: string, email: string) => Promise<K>;
  userExists: (username: string) => Promise<boolean>;
}

declare type Key = number | string;

export default "foo";
