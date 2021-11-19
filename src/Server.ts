import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import { Database } from "./database/interface";
import RegisterRouter from "./routers/register";
import LoginRouter from "./routers/login";
import LogoutRouter from "./routers/logout";
import initializePassport from "./utils/initializePassport";
import NotesRouter from "./routers/notes";

function makeServer(db: Database<number | string>) {
  initializePassport(db, passport);

  const app = express();
  app.use(cors());
  app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/register", RegisterRouter(db));
  app.use("/login", LoginRouter());
  app.use("/logout", LogoutRouter());
  app.use("/notes", NotesRouter());

  app.get("/", (req, res) => {
    res.send("ok");
  });

  return app;
}

export default makeServer;