import express from "express";
import supertest, { SuperAgentTest } from "supertest";
import { Response } from "superagent";
import InMemoryDB from "../database/InMemoryDB";
import makeServer from "../Server";

describe("Given an unauthenticated user", () => {
  let server: express.Express;
  let agent: SuperAgentTest;
  beforeEach(async () => {
    server = makeServer(InMemoryDB());
    agent = supertest.agent(server);
  });
  describe("When the user goes to /notes", () => {
    let notesResponse: Response;
    beforeEach(async () => {
      notesResponse = await agent
        .get("/notes")
        .query({});
    });
    test("Then the server should respond with 401", () => {
      expect(notesResponse.status).toBe(401);
    });
  });
});