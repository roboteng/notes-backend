import Database from "./interface";

function InMemoryDB(): Database<number> {
  const users = [];
  return {
    registerUser: async (username: string, hash: string, salt: string, email: string) => {
      const id = users.length;
      users.push({ username, email, hash, salt, id });
      return id;
    },
    userExists: async (username: string) => {
      return users.some(user => user.username === username);
    },
  };
}

export default InMemoryDB;