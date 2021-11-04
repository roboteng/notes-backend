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
    let postResponse: request.Response;
    beforeEach(async () => {
      postResponse = await supertest(server).post("/register");
    });
    test("Then the server should respond with 400", () => {
      expect(postResponse.status).toBe(400);
    });
  });
  describe("When a valid POST is sent to /register", () => {
    let postResponse: request.Response;
    beforeEach(async () => {
      postResponse = await supertest(server).post("/register").query({
        username: "user",
        email: "email@mail.com",
        password: "StrongPassword1234"
      });
    });
    test("Then the server should respond with 201", () => {
      expect(postResponse.status).toBe(201);
    });
    test("Then the response should have a cookie with a sessionID", () => {
      console.log(postResponse.headers["set-cookie"][0]);
      expect(postResponse.headers["set-cookie"][0]).toMatch(/session=[0-9a-f]{128};/);
    });
    describe("When a POST is missing username and sent to /register", () => {
      let postResponse: request.Response;
      beforeEach(async () => {
        postResponse = await supertest(server).post("/register").query({
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
        postResponse = await supertest(server).post("/register").query({
          username: "user",
          email: "email@mail.com",
          pw: "StrongPassword1234"
        });
      });
      test("Then the server should respond with 201", () => {
        expect(postResponse.status).toBe(400);
      });
    });
    describe("When a POST is missing email and sent to /register", () => {
      let postResponse: request.Response;
      beforeEach(async () => {
        postResponse = await supertest(server).post("/register").query({
          username: "user",
          e: "email@mail.com",
          password: "StrongPassword1234"
        });
      });
      test("Then the server should respond with 201", () => {
        expect(postResponse.status).toBe(400);
      });
    });
  });
});