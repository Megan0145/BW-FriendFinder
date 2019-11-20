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

  describe("[GET] /:id endpoint", () => {
    test("Should not return user by id if no token provided", () => {
      return request(server)
        .get("/api/users/1")
        .expect(401)
        .expect({ message: "You shall not pass! No credentials provided" });
    });
    test("Should return user by id if valid token provided", () => {
      return request(server)
        .get("/api/users/1")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxOSwidXNlcm5hbWUiOiJtZWdhbiIsImlhdCI6MTU3NDI2OTUzNCwiZXhwIjoxNTc0MzU1OTM0fQ.mckdVqdZd8KfbKnvIJEK4ngDqwOuOt_2zics4rDLLiw"
        )
        .expect(200);
    });
  });

  describe("[GET] /:id/messages endpoint", () => {
    test("Should not return user's messages if no token provided", () => {
      return request(server)
        .get("/api/users/1/messages")
        .expect(401)
        .expect({ message: "You shall not pass! No credentials provided" });
    });
    test("Should return user's messages if valid token provided", () => {
      return request(server)
        .get("/api/users/1/messages")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxOSwidXNlcm5hbWUiOiJtZWdhbiIsImlhdCI6MTU3NDI2OTUzNCwiZXhwIjoxNTc0MzU1OTM0fQ.mckdVqdZd8KfbKnvIJEK4ngDqwOuOt_2zics4rDLLiw"
        )
        .expect(200);
    });
  });
});
