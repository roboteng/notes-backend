import express from "express";
import supertest from "supertest";
import request from "superagent";
import InMemoryDB from "../database/InMemoryDB";
import makeServer from "../Server";

describe("Given a fresh Server", () => {
  let server: express.Express;
  let agent: supertest.SuperAgentTest;
  beforeEach(() => {
    server = makeServer(InMemoryDB());
    agent = supertest.agent(server);
  });
  describe("When an unknown user logs out", () => {
    let postResponse: request.Response;
    beforeEach(async () => {
      postResponse = await agent.post("/logout");
    });
    test("Then the server should respond with 200", () => {
      expect(postResponse.status).toBe(200);
    });
  });
});

describe("Given the user is logged in", () => {
  let server: express.Express;
  let agent: supertest.SuperAgentTest;
  beforeEach(async () => {
    server = makeServer(InMemoryDB());
    agent = supertest.agent(server);
    await agent.post("/register").query({
      username: "user",
      email: "email@mail.com",
      password: "StrongPassword1234"
    });
  });
  describe("When a request is made to /logout", () => {
    let logoutResponse: request.Response;
    beforeEach(async () => {
      logoutResponse = await agent
        .post("/logout");
    });
    test("Then the user should be logged out", () => {
      expect(logoutResponse.status).toBe(200);
    });
  });
});