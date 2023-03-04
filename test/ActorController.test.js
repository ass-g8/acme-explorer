/* eslint-disable no-undef */
import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import app from "../app.js";
import Actor from "../api/models/ActorModel.js";

const { expect } = chai;
chai.use(chaiHttp);

describe("Actor Controller test", () => {
  it("GET /actor", (done) => {
    const stub = sinon.stub(Actor, "find").returns(JSON.stringify([{ users: [] }]));
    chai.request(app)
      .get("/api/v1/actors")
      .end((err, res) => {
        expect(stub.calledOnce).to.be.true;
        expect(res).to.have.status(200);
        expect("Content-Type", /json/);
        if (err) done(err);
        else done();
      });
  });
});
