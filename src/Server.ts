import express from "express";
import RegisterRouter from "./routers/register";

function makeServer() {
  const app = express();
  app.use(express.json());

  app.use("/register", RegisterRouter());

  app.get("/", (req, res) => {
    res.send("ok");
  });

  return app;
}

export default makeServer;