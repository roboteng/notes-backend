import { Router } from "express";

function NotesRouter() {
  const router = Router();

  router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).send();
    } else {
      res.status(401).send();
    }
  });

  return router;
}

export default NotesRouter;