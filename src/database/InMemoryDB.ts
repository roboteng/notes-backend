import { Database } from "./interface";

interface User {
  username: string,
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
  const users: User[] = [];
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