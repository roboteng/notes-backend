import { Router } from "express";

function LogoutRouter() {
  const router = Router();

  router.post("/", (req, res) => {
    const session: string = req.cookies["notes-session"];
    if (session && session.match(/[0-9a-f]{128}/)) {
      res.status(200).send();
    } else {
      res.status(400).send();
    }
  });

  return router;
}

export default LogoutRouter;