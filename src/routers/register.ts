import { Router, Request } from "express";
import crypto from "crypto";

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

function genPassword(password: string) {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

function RegisterRouter<Key extends number | string>(db: Database<Key>) {
  const router = Router();
  router.post("/", async (req: Request<unknown, unknown, unknown, RegisterQuery>, res) => {
    if (requestIsValid(req)) {
      if (await db.userExists(req.query.username)) {
        res.status(401).json({ reason: "That username is already in use" });
      } else {
        // TODO: login, so that we aren't sending the hashed password as the session id
        const { hash, salt } = genPassword(req.query.password);
        db.registerUser(req.query.username, hash, salt, req.query.email);
        res.status(201).cookie("session", hash).send();
      }
    } else {
      res.status(400).send();
    }
  });
  return router;
}

export default RegisterRouter;