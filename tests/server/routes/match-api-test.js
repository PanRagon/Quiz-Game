const request = require("supertest");
const app = require("../../../src/server/app");

test("Test create match with no authentication", async () => {

    const response = await request(app).post("/api/matches");

    expect(response.statusCode).toBe(401);
});

test("Test create match with registration", async () => {

    const user = request.agent(app);

    const register = await user.post("/api/register").send({id: "foo", password: "bar"}).set("Content-Type", "application/json");

    expect(register.statusCode).toBe(201);

    const response = await user.post("/api/matches");

    expect(response.statusCode).toBe(201);
    expect(response.body.length).toBe(3);
});
