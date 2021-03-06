import User from "./User";

export default class AuthUser<K extends number | string> extends User {
  constructor(
    username: string,
    email: string,
    public hash: string,
    public salt: string,
    public id: K,
  ) {
    super(username, email);
  }
}