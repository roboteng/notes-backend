import supertest from "supertest";
import Server from "../Server";

describe("Given a fresh Server", () => {
  let server;
  beforeEach(() => {
    server = Server();
  });
  describe("When a request is sent to /", () => {
    let pingResponse;
    beforeEach(async () => {
      pingResponse = await supertest(server).get("/");
    });
    test("Then the server should respond with 200", () => {
      expect(pingResponse.status).toBe(200);
    });
  });
});