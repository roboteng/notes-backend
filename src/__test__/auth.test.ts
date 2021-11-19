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
    describe("When the user registers and goes to /notes", () => {
      let notesResponse: Response;
      beforeEach(async () => {
        await agent
          .post("/register")
          .query({
            username: "user",
            email: "email@mail.com",
            password: "StrongPassword1234",
          });
        notesResponse = await agent
          .get("/notes")
          .query({});
      });
      test("Then the server should provide the content", () => {
        expect(notesResponse.status).toBe(200);
      });
      describe("When the user logs out and goes to /notes", () => {
        let notesResponse: Response;
        beforeEach(async () => {
          await agent
            .post("/logout")
            .query({});
          notesResponse = await agent
            .get("/notes")
            .query({});
        });
        test("Then the server should respond with 401", () => {
          expect(notesResponse.status).toBe(401);
        });
        describe("When the user logs bak in and goes to /notes", () => {
          let notesResponse: Response;
          beforeEach(async () => {
            await agent
              .post("/login")
              .query({
                username: "user",
                password: "StrongPassword1234",
              });
            notesResponse = await agent
              .get("/notes")
              .query({});
          });
          test("Then the server should provide the content", () => {
            expect(notesResponse.status).toBe(200);
          });
        });
      });
    });
  });
});