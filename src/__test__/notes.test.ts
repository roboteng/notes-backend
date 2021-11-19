import express from "express";
import supertest, { SuperAgentTest } from "supertest";
import { Response } from "superagent";
import InMemoryDB from "../database/InMemoryDB";
import makeServer from "../Server";

function postNote(agent: SuperAgentTest, args: Record<string, unknown>) {
  return agent.post("/notes").query(args);
}

describe("Given an authenticated user", () => {
  let server: express.Express;
  let agent: SuperAgentTest;
  beforeEach(async () => {
    server = makeServer(InMemoryDB());
    agent = supertest.agent(server);
    await agent
      .post("/register")
      .query({
        username: "user",
        email: "email@mail.com",
        password: "StrongPassword1234",
      });
  });
  describe("When the user goes to /notes", () => {
    let notesResponse: Response;
    beforeEach(async () => {
      notesResponse = await agent
        .get("/notes");
    });
    test("Then the server should respond with 200", () => {
      expect(notesResponse.status).toBe(200);
    });
    test("Then the server should give an empty list of notes", () => {
      expect(notesResponse.body.notes).toEqual([]);
    });
    describe("When the user posts a new note", () => {
      let postResponse: Response;
      beforeEach(async () => {
        postResponse = await postNote(agent, {
          name: "Note Name",
          body: "This is a note",
        });
      });
      test("Then the serve should respond with 201", () => {
        expect(postResponse.statusCode).toBe(201);
      });
      test("Then the response shouldn't contain anything else", () => {
        expect(postResponse.body).toEqual({});
      });
    });
  });
});