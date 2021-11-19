import { Router } from "express";

function LogoutRouter() {
  const router = Router();

  router.post("/", (req, res) => {
    if (req.isAuthenticated()) {
      req.logout();
      res.status(200).send();
    } else {
      res.status(400).send();
    }
  });

  return router;
}

export default LogoutRouter;