import { describe, it } from "mocha";
import * as chai from "chai";
import app from "../../../app.js";
import { agent } from "supertest";

describe("Actor Controller test", () => {
  it("GET /actor", () => {
    agent(app)
      .get("/api/v1/actors")
      .expect(200)
      .end((_err, res) => {
        chai.assert.equal(res.status, 200);
      });
  });
});
