const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../src/app");
const User = require("../src/models/User");

let mongoServer;

beforeAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  if (app.close) {
    await app.close();
  }
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

describe("Backend API Full Suite", () => {
  const userData = {
    firstName: "Jan",
    lastName: "Kowalski",
    email: "jan@test.pl",
    password: "password123",
  };

  it("1. Powinien poprawnie zarejestrować nowego użytkownika", async () => {
    const res = await request(app).post("/api/auth/register").send(userData);
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(userData.email);
  });

  it("2. Powinien odrzucić rejestrację przy użyciu zajętego adresu e-mail", async () => {
    await User.create(userData);

    const res = await request(app).post("/api/auth/register").send(userData);

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body.success).toBe(false);
  });

  it("3. Powinien poprawnie zalogować i zwrócić token JWT", async () => {
    await User.create(userData);

    const res = await request(app).post("/api/auth/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("token");
  });

  it("4. Powinien odrzucić logowanie przy błędnym haśle", async () => {
    await User.create(userData);

    const res = await request(app).post("/api/auth/login").send({
      email: userData.email,
      password: "wrong_password",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body.success).toBe(false);
  });

  it("5. Powinien pozwolić na dostęp do trasy chronionej /me z ważnym tokenem", async () => {
    await User.create(userData);
    const loginRes = await request(app).post("/api/auth/login").send({
      email: userData.email,
      password: userData.password,
    });
    const token = loginRes.body.data.token;

    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.user.email).toBe(userData.email);
  });

  it("6. Powinien zablokować dostęp do trasy chronionej bez tokena", async () => {
    const res = await request(app).get("/api/auth/me");

    expect(res.statusCode).toEqual(401);
  });

  it("7. Powinien zwrócić 404 dla nieistniejącego punktu końcowego (endpointu)", async () => {
    const res = await request(app).get("/api/v1/invalid-route-name");

    expect(res.statusCode).toEqual(404);
  });
});
