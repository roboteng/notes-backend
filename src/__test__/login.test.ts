import express from "express";
import supertest from "supertest";
import request from "superagent";
import InMemoryDB from "../database/InMemoryDB";
import makeServer from "../Server";

describe("Given a server with one user", () => {
  let server: express.Express;
  let registerResponse: request.Response;
  let sessionID: string;
  beforeEach(async () => {
    server = makeServer(InMemoryDB());
    registerResponse = await supertest(server).post("/register").query({
      username: "user",
      email: "email@mail.com",
      password: "StrongPassword1234"
    });
    const cookie: string = registerResponse.headers["set-cookie"][0];
    sessionID = cookie.match(/notes-session=([0-9a-f]{128});/)[1];
    await supertest(server)
      .post("/logout")
      .set("Cookie", [`notes-session=${sessionID};`,]);
  });
  describe("When an invalid request is sent", () => {
    let loginResponse: request.Response;
    beforeEach(async () => {
      loginResponse = await supertest(server)
        .post("/login");
    });
    test("Then the server responds with 400", () => {
      expect(loginResponse.status).toBe(400);
    });
  });
  describe("When a different user tries to log in", () => {
    let loginResponse: request.Response;
    beforeEach(async () => {
      loginResponse = await supertest(server)
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
      loginResponse = await supertest(server)
        .post("/login")
        .query({ username: "user", password: "StrongPassword1234" });
    });
    test("Then the server responds with 201", () => {
      expect(loginResponse.status).toBe(201);
    });
  });
});