import express from "express";

function Server() {
  const app = express();
  app.use(express.json());
  app.use("/", (req, res) => {
    res.send();
  });
  return app;
}

export default Server;