import express from "express";
import supertest from "supertest";
import request from "superagent";
import InMemoryDB from "../database/InMemoryDB";
import makeServer from "../Server";

describe("Given a fresh Server", () => {
  let server: express.Express;
  beforeEach(() => {
    server = makeServer(InMemoryDB());
  });
  describe("When a blank POST is sent to /login", () => {
    let postResponse: request.Response;
    beforeEach(async () => {
      postResponse = await supertest(server).post("/login");
    });
    test("Then the server should respond with 400", () => {
      expect(postResponse.status).toBe(400);
    });
  });
});