import { Router } from "express";
import crypto from "crypto";

function requestIsValid(req) {
  return (Object.keys(req.query).length === 3)
    && req.query.username
    && req.query.email
    && req.query.password;
}

function genPassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

function RegisterRouter() {
  const router = Router();
  router.post("/", (req, res) => {
    if (requestIsValid(req)) {
      const { hash } = genPassword(req.query.password);
      res.status(201).cookie("session", hash).send();
    } else {
      res.status(400).send();
    }
  });
  return router;
}

export default RegisterRouter;