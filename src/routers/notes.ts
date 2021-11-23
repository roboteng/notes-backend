import { Request, Router } from "express";
import authenticate from "./middleware/authenticate";

class Note {
  constructor(
    public name: string,
    public body: string,
  ) { }
}

interface NewNoteQuery {
  name: string | undefined,
}

function NotesRouter() {
  const notes: Note[] = [];
  const router = Router();

  router.get("/", authenticate, (req, res) => {
    res.send({
      notes: notes.map((note, i) => {
        return { ...note, id: i };
      })
    });
  });

  router.post("/", authenticate, (req: Request<unknown, unknown, string, NewNoteQuery>, res) => {
    if (req.query.name) {
      notes.push(new Note(req.query.name, req.body));
      res.status(201).send();
    } else {
      res.status(400).send();
    }
  });

  return router;
}

export default NotesRouter;