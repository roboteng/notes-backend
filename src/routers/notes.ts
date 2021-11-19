import { Request, Router } from "express";
import authenticate from "./middleware/authenticate";

interface NewNoteQuery {
  name: string | undefined,
}

function NotesRouter() {
  const router = Router();

  router.get("/", authenticate, (req, res) => {
    res.send({ notes: [] });
  });

  router.post("/", authenticate, (req: Request<unknown, unknown, unknown, NewNoteQuery>, res) => {
    if (req.query.name) {
      console.log(req.body);
      res.status(201).send();
    } else {
      res.status(400).send();
    }
  });

  return router;
}

export default NotesRouter;