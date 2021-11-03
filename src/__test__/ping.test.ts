import request from "superagent";
import supertest from "supertest";
import express from "express";
import Server from "../Server";

describe("Given a fresh Server", () => {
  let server: express.Express;
  beforeEach(() => {
    server = Server();
  });
  describe("When a request is sent to /", () => {
    let pingResponse: request.Response;
    beforeEach(async () => {
      pingResponse = await supertest(server).get("/");
    });
    test("Then the server should respond with 200", () => {
      expect(pingResponse.status).toBe(200);
    });
    test("Then the server should respond with 'ok'", () => {
      expect(pingResponse.text).toBe("ok");
    });
  });
});