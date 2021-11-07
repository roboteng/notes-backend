import { Request, Router } from "express";
import { Database } from "../database/interface";
import hashPassword from "../utils/hashPassword";

interface LoginQuery {
  username: string,
  password: string,
}

function LoginRouter(db: Database<number | string>): Router {
  const router = Router();

  router.post("/", async (req: Request<unknown, unknown, unknown, LoginQuery>, res) => {
    if (req.query.username) {
      const data = await db.getUserHashAndSalt(req.query.username);
      if (data !== null) {
        const { hash: correctHash, salt } = data;
        const possibleHash = hashPassword(req.query.password, salt);
        if (correctHash === possibleHash) {
          res.status(201).send();
        } else {
          res.status(401).send();
        }
      } else {
        res.status(401).send();
      }
    } else {
      res.status(400).send();
    }
  });

  return router;
}

export default LoginRouter;