import { Request, Response } from "express";

function authenticate(
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response,
  next: () => void
) {
  if (!req.isAuthenticated()) {
    res.status(401).send();
  } else {
    next();
  }
}

export default authenticate;