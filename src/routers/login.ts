import { Router } from "express";

function LoginRouter(db: Database<Key>): Router {
  const router = Router();

  router.post("/", (req, res) => {
    res.status(400).send();
  });

  return router;
}

export default LoginRouter;