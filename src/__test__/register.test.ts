import request from "superagent";
import supertest from "supertest";
import express from "express";
import makeServer from "../Server";

describe("Given a fresh Server", () => {
  let server: express.Express;
  beforeEach(() => {
    server = makeServer();
  });
  describe("When a blank POST is sent to /register", () => {
    let pingResponse: request.Response;
    beforeEach(async () => {
      pingResponse = await supertest(server).post("/register");
    });
    test("Then the server should respond with 400", () => {
      expect(pingResponse.status).toBe(400);
    });
  });
});