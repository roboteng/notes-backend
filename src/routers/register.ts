import { Router } from "express";

function RegisterRouter() {
  const router = Router();
  router.post("/", (req, res) => {
    if (Object.keys(req.query).length === 3) {
      res.status(201).send();
    } else {
      res.status(400).send();
    }
  });
  return router;
}

export default RegisterRouter;