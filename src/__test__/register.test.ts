import request from "superagent";
import supertest from "supertest";
import express from "express";
import makeServer from "../Server";
import InMemoryDB from "../database/InMemoryDB";

describe("Given a fresh Server", () => {
  let server: express.Express;
  let agent: supertest.SuperAgentTest;
  beforeEach(() => {
    server = makeServer(InMemoryDB());
    agent = supertest.agent(server);
  });
  describe("When a blank POST is sent to /register", () => {
    let postResponse: request.Response;
    beforeEach(async () => {
      postResponse = await agent.post("/register");
    });
    test("Then the server should respond with 400", () => {
      expect(postResponse.status).toBe(400);
    });
  });
  describe("When a valid POST is sent to /register", () => {
    let postResponse: request.Response;
    beforeEach(async () => {
      postResponse = await agent.post("/register").query({
        username: "user",
        email: "email@mail.com",
        password: "StrongPassword1234"
      });
    });
    test("Then the server should respond with 201", () => {
      expect(postResponse.status).toBe(201);
    });
    test("Then the response should contain the user information", () => {
      expect(postResponse.body.username).toBe("user");
      expect(postResponse.body.email).toBe("email@mail.com");
    });
    test("Then the response shouldn't leak the id, hash, or salt", () => {
      expect(postResponse.body.hash).toBeUndefined();
      expect(postResponse.body.salt).toBeUndefined();
      expect(postResponse.body.id).toBeUndefined();
    });
    describe("When another request comes with the same username", () => {
      let postResponse2: request.Response;
      let otherAgent: supertest.SuperAgentTest;
      beforeEach(async () => {
        otherAgent = supertest.agent(server);
        postResponse2 = await otherAgent.post("/register").query({
          username: "user",
          email: "email@mail.com",
          password: "StrongPassword1234"
        });
      });
      test("Then the response should have a 401 status", () => {
        expect(postResponse2.status).toBe(401);
      });
      test("Then the response contains a helpful message", () => {
        expect(postResponse2.body.reason).toBe("That username is already in use");
      });
    });
    describe("When a POST is missing username and sent to /register", () => {
      let postResponse: request.Response;
      beforeEach(async () => {
        postResponse = await agent.post("/register").query({
          user: "user",
          email: "email@mail.com",
          password: "StrongPassword1234"
        });
      });
      test("Then the server should respond with 201", () => {
        expect(postResponse.status).toBe(400);
      });
    });
    describe("When a POST is missing password and sent to /register", () => {
      let postResponse: request.Response;
      beforeEach(async () => {
        postResponse = await agent.post("/register").query({
          username: "user",
          email: "email@mail.com",
          pw: "StrongPassword1234"
        });
      });
      test("Then the server should respond with 400", () => {
        expect(postResponse.status).toBe(400);
      });
    });
    describe("When a POST is missing email and sent to /register", () => {
      let postResponse: request.Response;
      beforeEach(async () => {
        postResponse = await agent.post("/register").query({
          username: "user",
          e: "email@mail.com",
          password: "StrongPassword1234"
        });
      });
      test("Then the server should respond with 400", () => {
        expect(postResponse.status).toBe(400);
      });
    });
  });
});