import express from "express";
import supertest, { SuperAgentTest } from "supertest";
import request from "superagent";
import InMemoryDB from "../database/InMemoryDB";
import makeServer from "../Server";

describe("Given a server with one user", () => {
  let server: express.Express;
  let agent: SuperAgentTest;
  beforeEach(async () => {
    server = makeServer(InMemoryDB());
    agent = supertest.agent(server);
    await agent.post("/register").query({
      username: "user",
      email: "email@mail.com",
      password: "StrongPassword1234"
    });
    await agent
      .post("/logout");
  });
  describe("When an invalid request is sent", () => {
    let loginResponse: request.Response;
    beforeEach(async () => {
      loginResponse = await agent
        .post("/login");
    });
    test("Then the server responds with 400", () => {
      expect(loginResponse.status).toBe(400);
    });
  });
  describe("When a different user tries to log in", () => {
    let loginResponse: request.Response;
    let otherAgent: SuperAgentTest;
    beforeEach(async () => {
      otherAgent = supertest.agent(server);
      loginResponse = await otherAgent
        .post("/login")
        .query({ username: "differentUser", password: "differentPassword" });
    });
    test("Then the server responds with 401", () => {
      expect(loginResponse.status).toBe(401);
    });
  });
  describe("When the user logs in with the right password", () => {
    let loginResponse: request.Response;
    beforeEach(async () => {
      loginResponse = await agent
        .post("/login")
        .query({ username: "user", password: "StrongPassword1234" });
    });
    test("Then the server responds with 201", () => {
      expect(loginResponse.status).toBe(201);
    });
  });
});