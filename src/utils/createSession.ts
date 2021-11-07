import { Database } from "../database/interface";
import randomHex from "./randomHex";

async function createSession<K extends string | number>(db: Database<K>, userId: K) {
  const sessionId = randomHex(128);
  await db.storeSession(userId, sessionId);
  return sessionId;
}

export default createSession;