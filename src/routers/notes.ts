import { Router } from "express";

function authenticate(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401).send();
  } else {
    next();
  }
}

function NotesRouter() {
  const router = Router();

  router.get("/", authenticate, (req, res) => {
    res.status(200).send();
  });

  return router;
}

export default NotesRouter;