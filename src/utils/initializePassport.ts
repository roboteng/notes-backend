import { PassportStatic } from "passport";
import { Strategy } from "passport-local";

import { Database } from "../database/interface";
import AuthUser from "../models/AuthUser";
import hashPassword from "./hashPassword";

export default function initializePassport<K extends number | string>(db: Database<K>, passport: PassportStatic) {
  async function authenticateUser(username: string, password: string, done: (e: Error, r: AuthUser<K> | boolean) => void) {
    try {
      if (await db.userExists(username)) {
        const { salt, hash, user } = await db.getUserHashAndSalt(username);
        const given = hashPassword(password, salt);
        if (given === hash) {
          done(null, user);
        } else {
          done(null, false);
        }
      } else {
        done(null, false);
      }
    } catch (e) {
      done(e, null);
    }
  }

  passport.use(
    new Strategy(authenticateUser),
  );

  passport.serializeUser((user: AuthUser<K>) => user.id);
  passport.deserializeUser(async (userId: K) => db.getUser(userId));

}