const expect = require("chai").expect;
const assert = require("chai").assert;
const PORT = process.env.PORT || 8088;
const url = `http://localhost:${PORT}`;
const request = require("supertest")(url);

const validQuery = `{
    shortenURL(url : "http://google.com"){
        shortURL
        longURL
    }
}`;

const emptyURLQuery = `{
    shortenURL(url : ""){
        shortURL
        longURL
    }
}`;

const noSchemeURLQuery = `{
    shortenURL(url : "google.com"){
        shortURL
        longURL
    }
}`;

const invalidURLQuery = `{
    shortenURL(url : "http://google"){
        shortURL
        longURL
    }
}`;

describe("GraphQL", async () => {
  await it("Should return a string as short URL with length greater than 6", (done) => {
    request
      .post("/graphql")
      .send({
        query: validQuery,
      })
      .expect(200)
      .end((err, response) => {
        console.log(response.body);
        if (err) return done(err);
        expect(response.body.data.shortenURL.shortURL).to.be.string;
        expect(
          response.body.data.shortenURL.shortURL
        ).has.length.greaterThanOrEqual(6);
        done();
      });
  });

  it("Should return at least one error if url is empty", (done) => {
    request
      .post("/graphql")
      .send({
        query: emptyURLQuery,
      })
      .expect(200)
      .end((err, response) => {
        if (err) return done(err);
        console.log(response.body);
        expect(response.body.errors).has.length.greaterThan(0);
        done();
      });
  });

  it("Should return at least one error if url does not have a scheme (http/https)", (done) => {
    request
      .post("/graphql")
      .send({
        query: noSchemeURLQuery,
      })
      .expect(200)
      .end((err, response) => {
        if (err) return done(err);
        console.log(response.body);
        expect(response.body.errors).has.length.greaterThan(0);
        done();
      });
  });

  it("Should return at least one error if url is not valid", (done) => {
    request
      .post("/graphql")
      .send({
        query: invalidURLQuery,
      })
      .expect(200)
      .end((err, response) => {
        if (err) return done(err);
        console.log(response.body);
        expect(response.body.errors).has.length.greaterThan(0);
        done();
      });
  });
});
