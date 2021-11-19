import AuthUser from "../models/AuthUser";


export class Database<K extends Key> {
  registerUser: (username: string, hash: string, salt: string, email: string) => Promise<K>;
  userExists: (username: string) => Promise<boolean>;
  getUserHashAndSalt: (username: string) => Promise<{ hash: string, salt: string, user: AuthUser<K> } | null>;
  getUser: (id: K) => Promise<AuthUser<K>>;
}

declare type Key = number | string;

export default "foo";
