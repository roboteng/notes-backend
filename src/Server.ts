import express from "express";

function makeServer() {
  const app = express();
  app.use(express.json());
  app.use("/", (req, res) => {
    res.send("ok");
  });
  return app;
}

export default makeServer;