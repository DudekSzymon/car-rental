const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../src/app");
const User = require("../src/models/User");
const Car = require("../src/models/Car");

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
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

describe("Backend API - Cars & Rentals Suite", () => {
  let adminToken;
  let carId;

  const adminData = {
    firstName: "Admin",
    lastName: "User",
    email: "admin@test.pl",
    password: "password123",
    role: "admin",
  };

  const testCar = {
    name: "911 Carrera",
    brand: "Porsche",
    year: 2023,
    pricePerDay: 500,
    fuelType: "Gasoline",
    seats: 4,
    transmission: "Automatic",
    image: "car-1.jpg",
  };

  beforeEach(async () => {
    await User.create(adminData);

    const loginRes = await request(app).post("/api/auth/login").send({
      email: adminData.email,
      password: adminData.password,
    });

    adminToken = loginRes.body.data.token;

    const car = await Car.create(testCar);
    carId = car._id.toString();
  });
  it("8. Powinien zwrócić listę wszystkich samochodów (publiczne)", async () => {
    const res = await request(app).get("/api/cars");
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("9. Powinien pozwolić administratorowi na dodanie nowego pojazdu", async () => {
    const newCar = { ...testCar, name: "M4 Competition", brand: "BMW" };
    const res = await request(app)
      .post("/api/cars")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newCar);

    expect(res.statusCode).toEqual(201);
    expect(res.body.data.name).toBe("M4 Competition");
  });

  it("10. Powinien zablokować dodawanie pojazdu przez zwykłego użytkownika", async () => {
    await User.create({ ...adminData, email: "user@test.pl", role: "user" });
    const loginRes = await request(app).post("/api/auth/login").send({
      email: "user@test.pl",
      password: "password123",
    });
    const regularToken = loginRes.body.data.token;

    const res = await request(app)
      .post("/api/cars")
      .set("Authorization", `Bearer ${regularToken}`)
      .send(testCar);

    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toContain("Wymagane uprawnienia administratora");
  });

  it("11. Powinien poprawnie utworzyć nową rezerwację", async () => {
    const rentalData = {
      carId: carId,
      startDate: "2025-06-01",
      endDate: "2025-06-05",
      totalPrice: 2000,
      driverDetails: {
        firstName: "Jan",
        lastName: "Kowalski",
        phone: "123456789",
      },
    };

    const res = await request(app)
      .post("/api/rentals")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(rentalData);

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.car.toString()).toBe(carId);
  });

  it("12. Powinien pobrać rezerwacje zalogowanego użytkownika", async () => {
    const res = await request(app)
      .get("/api/rentals/my-rentals")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
