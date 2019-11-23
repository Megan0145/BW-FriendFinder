const request = require("supertest");
const server = require("./server");
const db = require("../data/db-config");

beforeEach(() => {
  return db("users").truncate();
});

describe("server", () => {
  describe("[GET] / endpoint", () => {
    test("the db env is testing", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
    test("Returns 200 OK", () => {
      return request(server)
        .get("/")
        .expect(200)
        .expect("Welcome to Friend Finder API!");
    });
  });
});
