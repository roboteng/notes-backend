import { Router, Request } from "express";
import { Database } from "../database/interface";
import randomHex from "../utils/randomHex";
import createSession from "../utils/createSession";
import hashPassword from "../utils/hashPassword";

interface RegisterQuery {
  username: string,
  email: string,
  password: string,
}

function requestIsValid(req: Request<unknown, unknown, unknown, RegisterQuery>) {
  return (Object.keys(req.query).length === 3)
    && req.query.username
    && req.query.email
    && req.query.password;
}

function RegisterRouter<Key extends number | string>(db: Database<Key>) {
  const router = Router();
  router.post("/", async (req: Request<unknown, unknown, unknown, RegisterQuery>, res) => {
    if (requestIsValid(req)) {
      if (await db.userExists(req.query.username)) {
        res.status(401).json({ reason: "That username is already in use" });
      } else {
        const salt = randomHex(128);
        const hash = hashPassword(req.query.password, salt);
        const userId = await db.registerUser(req.query.username, hash, salt, req.query.email);
        const sessionId = await createSession(db, userId);
        res.status(201).cookie("notes-session", sessionId).send();
      }
    } else {
      res.status(400).send();
    }
  });
  return router;
}

export default RegisterRouter;