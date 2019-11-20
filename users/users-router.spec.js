const request = require("supertest");
const server = require("../api/server");
const db = require("../data/db-config");

beforeEach(async () => {
  await db("users").truncate();
  await db("users").insert({ username: "Megan", password: "1234" });
});

describe("Users router", () => {
  describe("[GET] / endpoint", () => {
    test("Should not return all users if no token provided", () => {
      return request(server)
        .get("/api/users")
        .expect(401)
        .expect({ message: "You shall not pass! No credentials provided" });
    });
    test("Should return all users if valid token provided", () => {
      return request(server)
        .get("/api/users")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxOSwidXNlcm5hbWUiOiJtZWdhbiIsImlhdCI6MTU3NDI2OTUzNCwiZXhwIjoxNTc0MzU1OTM0fQ.mckdVqdZd8KfbKnvIJEK4ngDqwOuOt_2zics4rDLLiw"
        )
        .expect(200);
    });
  });

  describe("[POST] /login endpoint", () => {
    // test("Login endpoint returns 401 when no credentials provided", () => {
    //   return request(server)
    //     .post("/api/auth/login")
    //     .expect(401)
    //     .expect({ message: "Missing user data" });
    // });
    // test("Login endpoint returns 201 when valid credentials provided", async () => {
    //   await request(server)
    //     .post("/api/auth/register")
    //     .send({ username: "Testing", password: "1234" });
    //   const loginResponse = await request(server)
    //     .post("/api/auth/login")
    //     .send({ username: "Testing", password: "1234" });
    //   expect(loginResponse.status).toBe(200);
    // });
  });
});
