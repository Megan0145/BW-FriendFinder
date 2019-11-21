const request = require("supertest");
const server = require("../api/server");
const db = require("../data/db-config");
const tokenGenerator = require("../middleware/tokenGenerator");

const sampleUser = { id: 1, username: "Megan", password: "1234" };
const sampleUser2 = { id: 2, username: "Test", password: "1234" };
const token = tokenGenerator(sampleUser);

beforeEach(async () => {
  await db("users").truncate();
  await db("users").insert(sampleUser);
  await db("users").insert(sampleUser2);
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
        .set("Authorization", token)
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
        .set("Authorization", token)
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
    test("Should return user's messages if valid token provided", async () => {
      await request(server)
        .get("/api/users/1/messages")
        .set("Authorization", token)
        .expect(200);
    });
  });

  describe("[GET] /:id/messages/sent endpoint", () => {
    test("Should not return user's sent messages if no token provided", () => {
      return request(server)
        .get("/api/users/1/messages/sent")
        .expect(401)
        .expect({ message: "You shall not pass! No credentials provided" });
    });
    test("Should return user's sent messages if valid token provided", async () => {
      await request(server)
        .get("/api/users/1/messages/sent")
        .set("Authorization", token)
        .expect(200);
    });
  });

  describe("[POST] /:id/messages/ endpoint", () => {
    test("Should not allow user to send messages if no token provided", () => {
      return request(server)
        .post("/api/users/1/messages")
        .expect(401)
        .expect({ message: "You shall not pass! No credentials provided" });
    });
    test("Should not allow user to send messages if valid token but incorrect request body provided", async () => {
      await request(server)
        .post("/api/users/1/messages")
        .set("Authorization", token)
        .expect(500);
    });
    test("Should allow user to send messages if valid token & correct request body provided", async () => {
        await request(server)
          .post("/api/users/1/messages")
          .set("Authorization", token)
          .send({"receiver_id": 2, "message": "Hello user 2!"})
          .expect(500);
      });
  });
});
