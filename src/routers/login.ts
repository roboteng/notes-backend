import { Router } from "express";
import { Database } from "../database/interface";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function LoginRouter(db: Database<number | string>): Router {
  const router = Router();

  router.post("/", (req, res) => {
    res.status(400).send();
  });

  return router;
}

export default LoginRouter;