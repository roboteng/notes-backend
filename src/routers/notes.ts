import { Router } from "express";
import authenticate from "./middleware/authenticate";

function NotesRouter() {
  const router = Router();

  router.get("/", authenticate, (req, res) => {
    res.status(200).send();
  });

  return router;
}

export default NotesRouter;