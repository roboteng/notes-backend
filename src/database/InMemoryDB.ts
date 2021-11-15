import User from "../models/User";
import { Database } from "./interface";

interface AuthUser extends User {
  email: string,
  hash: string,
  salt: string,
  id: number,
}

interface Session {
  userId: number,
  sessionId: string,
}

function InMemoryDB(): Database<number> {
  const users: AuthUser[] = [];
  const sessions: Session[] = [];
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
      const user = users.filter(u => u.id = userId)[0];
      return user as User;
    },
    getUserHashAndSalt: async (username: string) => {
      const result = users.filter((user) => user.username === username)[0];
      if (result) {
        return {
          hash: result.hash,
          salt: result.salt,
        };
      } else {
        return null;
      }
    },
    storeSession: async (userId: number, sessionId: string) => {
      sessions.push({ userId, sessionId });
    },
    getSession: async (sessionId: string) => {
      return sessions.filter(session => session.sessionId === sessionId)[0] || null;
    }
  };
}

export default InMemoryDB;