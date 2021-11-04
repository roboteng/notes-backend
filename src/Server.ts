import express from "express";
import LoginRouter from "./routers/login";
import RegisterRouter from "./routers/register";

function makeServer(db: Database<Key>) {
  const app = express();
  app.use(express.json());

  app.use("/register", RegisterRouter(db));
  app.use("/login", LoginRouter(db));

  app.get("/", (req, res) => {
    res.send("ok");
  });

  return app;
}

export default makeServer;