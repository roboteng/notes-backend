import { Request, Router } from "express";
import passport from "passport";
import User from "../models/User";

interface LoginQuery {
  username: string,
  password: string,
}

function LoginRouter(): Router {
  const router = Router();

  router.post("/", async (req: Request<unknown, unknown, unknown, LoginQuery>, res) => {
    passport.authenticate("local",
      (err, user, info) => {
        if (err || info?.message === "Missing credentials") {
          res.status(400).send();
        } else {
          if (user) {
            req.login(user, (err) => {
              if (err) console.error(err);
              res.status(201).send(new User(
                user.username,
                user.email,
              ));
            });
          } else {
            res.status(401).send();
          }
        }
      }
    )(req, res);
  });

  return router;
}

export default LoginRouter;