import { Router } from "express";

function NotesRouter() {
  const router = Router();

  router.get("/", (req, res) => {
    res.status(401).send();
  });

  return router;
}

export default NotesRouter;