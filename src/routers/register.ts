import { Router } from "express";

function requestIsValid(req) {
  return (Object.keys(req.query).length === 3) && req.query.username;
}

function RegisterRouter() {
  const router = Router();
  router.post("/", (req, res) => {
    if (requestIsValid(req)) {
      res.status(201).send();
    } else {
      res.status(400).send();
    }
  });
  return router;
}

export default RegisterRouter;