/* eslint-disable @typescript-eslint/no-unused-vars */
declare interface Database<Key extends number | string> {
  registerUser: (username: string, hash: string, salt: string, email: string) => Promise<Key>,
  userExists: (username: string) => Promise<boolean>,
}

declare type Key = number | string;
