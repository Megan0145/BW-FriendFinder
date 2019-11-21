const request = require("supertest");
const server = require("../api/server");
const db = require("../data/db-config");

beforeEach(async () => {
  await db("users").truncate();
  await request(server)
    .post("/api/auth/register")
    .send({ username: "Megan", password: "1234" });
  await request(server)
    .post("/api/auth/register")
    .send({ username: "UserTwo", password: "1234" });
});

describe("Users router", () => {
  describe("[GET] / endpoint", () => {
    test("Should not return all users if no token provided", async () => {
      await request(server)
        .get("/api/users")
        .expect(401)
        .expect({ message: "You shall not pass! No credentials provided" });
    });
    test("Should return all users if valid token provided", async () => {
      const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "Megan", password: "1234" });

      const response = await request(server)
        .get("/api/users")
        .set("Authorization", JSON.parse(login.text).token)
        .expect(200);
    });
  });

  describe("[GET] /current endpoint", () => {
    test("Should not return current logged in user if no token provided", () => {
      return request(server)
        .get("/api/users/current")
        .expect(401)
        .expect({ message: "You shall not pass! No credentials provided" });
    });
    test("Should return current logged in user if valid token provided", async () => {
      const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "Megan", password: "1234" });

      const response = await request(server)
        .get("/api/users")
        .set("Authorization", JSON.parse(login.text).token)
        .expect(200);
    });
  });

  describe("[GET] /messages/sent endpoint", () => {
    test("Should not return user's sent messages if no token provided", () => {
      return request(server)
        .get("/api/users/messages/sent")
        .expect(401)
        .expect({ message: "You shall not pass! No credentials provided" });
    });
    test("Should return user's sent messages if valid token provided", async () => {
      const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "Megan", password: "1234" });
      await request(server)
        .get("/api/users/messages/sent")
        .set("Authorization", JSON.parse(login.text).token)
        .expect(200);
    });
  });

  describe("[GET] /messages", () => {
    test("Should not return user's messages if no token provided", () => {
      return request(server)
        .get("/api/users/messages")
        .expect(401)
        .expect({ message: "You shall not pass! No credentials provided" });
    });
    test("Should return user's messages if valid token provided", async () => {
      const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "Megan", password: "1234" });
      await request(server)
        .get("/api/users/messages")
        .set("Authorization", JSON.parse(login.text).token)
        .expect(200);
    });
  });

  describe("[POST] /messages endpoint", () => {
    test("Should not allow user to send messages if no token provided", () => {
      return request(server)
        .post("/api/users/messages")
        .expect(401)
        .expect({ message: "You shall not pass! No credentials provided" });
    });
    test("Should not allow user to send messages if valid token but incorrect request body provided", async () => {
      const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "Megan", password: "1234" });
      await request(server)
        .post("/api/users/messages")
        .set("Authorization", JSON.parse(login.text).token)
        .expect(500);
    });
    test("Should allow user to send messages if valid token & correct request body provided", async () => {
      const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "Megan", password: "1234" });
      await request(server)
        .post("/api/users/messages")
        .set("Authorization", JSON.parse(login.text).token)
        .send({ receiver_id: 2, message: "Hello user 2!" })
        .expect(200);
    });
  });

  describe("[GET] / questions endpoint", () => {
    test("Should not allow user to access questions if no token provided", () => {
      return request(server)
        .get("/api/users/questions")
        .expect(401)
        .expect({ message: "You shall not pass! No credentials provided" });
    });
    test("Should allow newly registered user to access questions if valid token provided", async () => {
      const login = await request(server)
      .post("/api/auth/login")
      .send({ username: "Megan", password: "1234" });
      return request(server)
        .get("/api/users/questions")
        .set("Authorization", JSON.parse(login.text).token)
        .expect(200);
    });
  });
});
