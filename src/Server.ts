import express from "express";
import LoginRouter from "./routers/login";
import RegisterRouter from "./routers/register";
import cookieParer from "cookie-parser";
import cors from "cors";

import { Database } from "./database/interface";
import LogoutRouter from "./routers/logout";
import session from "express-session";

function makeServer(db: Database<number | string>) {
  const app = express();
  app.use(express.json());
  app.use(cookieParer());
  app.use(cors());
  app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }));

  app.use("/register", RegisterRouter(db));
  app.use("/login", LoginRouter(db));
  app.use("/logout", LogoutRouter());


  app.get("/", (req, res) => {
    res.send("ok");
  });

  return app;
}

export default makeServer;