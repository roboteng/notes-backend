import express from "express";
import Database from "./database/interface";
import RegisterRouter from "./routers/register";

function makeServer<Key extends number | string>(db: Database<Key>) {
  const app = express();
  app.use(express.json());

  app.use("/register", RegisterRouter(db));

  app.get("/", (req, res) => {
    res.send("ok");
  });

  return app;
}

export default makeServer;