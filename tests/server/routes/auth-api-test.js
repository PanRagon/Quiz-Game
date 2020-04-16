const request = require("supertest");
const app = require("../../../src/server/app");

let counter = 0;


test("Test fail login", async () => {

    const response = await request(app).post("/api/login")
        .send({id: "foo_" + (counter++), password:"bar"})
        .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(401);
});

test("Fail to access data from non-existant user", async () => {

    const response = await request(app).get("/api/user");

    expect(response.statusCode).toBe(401);
});

test("Test create user, fail to extract data", async () => {
    const id = "foo_" + (counter++);

    let response = await request(app)
        .post("/api/register")
        .send({id, password: "bar"})
        .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(201);

    response = await request(app)
        .get("/api/user");

    expect(response.statusCode).toBe(401);
})