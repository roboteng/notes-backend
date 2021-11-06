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
  describe("When a blank POST is sent to /logout", () => {
    let postResponse: request.Response;
    beforeEach(async () => {
      postResponse = await supertest(server).post("/logout");
    });
    test("Then the server should respond with 400", () => {
      expect(postResponse.status).toBe(400);
    });
  });
  describe("When a POST is made with a valid unknown sessionID", () => {
    let logoutResponse: request.Response;
    beforeEach(async () => {
      const double = (x: string) => x + x;
      const part = "0123456789abcdef";
      logoutResponse = await supertest(server).post("/logout")
        .set("Cookie", [`notes-session=${double(double(double(part)))};`]);
    });
    test("Then the server should respond with 200", () => {
      expect(logoutResponse.statusCode).toBe(200);
    });
  });
  describe("When a POST is made with a non-valid sessionID", () => {
    let logoutResponse: request.Response;
    beforeEach(async () => {
      const double = (x: string) => x + x;
      const part = "0123456789abcdef";
      logoutResponse = await supertest(server).post("/logout")
        .set("Cookie", [`notes-session=${double(double(double(part)))};`]);
    });
    test("Then the server should respond with 200", () => {
      expect(logoutResponse.statusCode).toBe(200);
    });
  });
});

describe("Given a server with one logged in user", () => {
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
  });
  describe("When a request is made to /logout", () => {
    let logoutResponse: request.Response;
    beforeEach(async () => {
      console.log(sessionID);
      logoutResponse = await supertest(server)
        .post("/logout")
        .set("Cookie", [`notes-session=${sessionID};`,]);
    });
    test("Then the user should be logged out", () => {
      expect(logoutResponse.status).toBe(200);
    });
  });
});