import AuthUser from "../models/AuthUser";
import { Database } from "./interface";

function InMemoryDB(): Database<number> {
  const users: AuthUser<number>[] = [];
  return {
    registerUser: async (username: string, hash: string, salt: string, email: string) => {
      const id = users.length;
      users.push({ username, email, hash, salt, id });
      return id;
    },
    userExists: async (username: string) => {
      return users.some(user => user.username === username);
    },
    getUser: async (userId: number) => {
      const user = users.find(u => u.id === userId);
      return user;
    },
    getUserHashAndSalt: async (username: string) => {
      const user = users.find((user) => user.username === username);
      if (user) {
        return {
          hash: user.hash,
          salt: user.salt,
          user,
        };
      } else {
        return null;
      }
    },
  };
}

export default InMemoryDB;