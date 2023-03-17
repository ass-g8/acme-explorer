/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import app from "../../app.js";
import Actor from "../../api/models/ActorModel.js";

const { expect } = chai;
chai.use(chaiHttp);

describe("Actor Controller test", () => {
  it("GET /actor", (done) => {
    const stub = sinon.stub(Actor, "find").returns(Promise.resolve([{ users: [] }]));
    chai.request(app)
      .get("/api/v1/actors")
      .end((_err, res) => {
        expect(stub.calledOnce).to.be.true;
        expect(res).to.have.status(200);
        expect("Content-Type", /json/);
        done();
      });
  });

  it("GET /actor with 404 error", () => {
    const stub = sinon.stub(Actor, "find").returns(Promise.resolve(undefined));
    chai.request(app)
      .get("/api/v1/actors/641446af75a2718e86b235c3")
      .end((_err, res) => {
        expect(stub.calledOnce).to.be.true;
        expect(res).to.have.status(404);
        done();
      });
  });

  afterEach(() => {
    sinon.reset();
    sinon.restore();
  });
});
