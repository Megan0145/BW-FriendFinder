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
  describe("[POST] /register endpoint", () => {
    test("Register endpoint returns 401 when no credentials provided", () => {
      return request(server)
        .post("/api/auth/register")
        .expect(401)
        .expect({ message: "Missing user data" });
    });
    test("Register endpoint returns 201 when valid credentials provided", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "Testing", password: "1234" })
        .expect(201);
    });
    test("Register endpoint returns 401 when invalid credentials provided: user already exists", () => {
      return request(server)
        .post("/api/auth/register")
        .send([
          { username: "Testing", password: "1234" },
          { username: "Testing", password: "1234" }
        ])
        .expect(401);
    });
  });

  describe("[POST] /login endpoint", () => {
    test("Login endpoint returns 401 when no credentials provided", () => {
      return request(server)
        .post("/api/auth/login")
        .expect(401)
        .expect({ message: "Missing user data" });
    });
    test("Login endpoint returns 201 when valid credentials provided", async () => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "Testing", password: "1234" });
      const loginResponse = await request(server)
        .post("/api/auth/login")
        .send({ username: "Testing", password: "1234" });
      expect(loginResponse.status).toBe(200);
    });
  });
});
