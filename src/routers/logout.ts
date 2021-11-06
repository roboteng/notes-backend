import { Router } from "express";

function LogoutRouter() {
  const router = Router();

  router.post("/", (req, res) => {
    res.status(400).send();
  });

  return router;
}

export default LogoutRouter;