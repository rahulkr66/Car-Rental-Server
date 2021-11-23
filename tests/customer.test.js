const supertest = require("supertest")
const app = require("../app")
const request = supertest(app)
const db = require("../services/database")

const customerNewData = { customerName: 'test-customer' };




describe("Testing all customer related routes", () => {
    let token,id;
    beforeAll(async () => {
        await request
            .post("/api/auth/customer/login/")
            .send({
                customerEmail: "test@customer.com",
                password: "testpassword"
            })
            .then((res) => {
                token = JSON.parse(res.text).token
                console.log(token)
                id = JSON.parse(res.text).customerId
            })
        
    }, 30000)
    test('GET /api/', async () => {
        await request
        .get("/api/")
        .expect(200)
        .then((res) => {
            expect(res.text).toBe("Hello world!")
        })
    },30000)
    test('GET /api/customer/:id without token', async ()=>{
        await request
            .get("/api/customer/" + id)
            .then((res) => {
                expect(res.statusCode).toBe(401)
            })
    })
    test('GET /api/customer/:id with token', async () => {
        await request
            .get("/api/customer/" + id)
            .set("x-access-token",token)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.type).toBe('application/json')
            })
    })
    test('GET /api/booking/customer/:id', async () => {
        await request
            .get("/api/booking/" + id)
            .set("x-access-token",token)
            .then((res) => {
                expect(res.statusCode).toBe(404)
            })
    })
    test('GET /api/booking/customer/:id without token', async () => {
        await request
            .get("/api/booking/customer/" + id)
            .then((res) => {
                expect(res.statusCode).toBe(401)
            })
    })
    test('PUT /api/customer/:id', async () => {
        await request
            .put("/api/customer/" + id)
            .set("x-access-token",token)
            .send(customerNewData)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.type).toBe('application/json')
            })
    })
    test('PUT /api/customer/:id', async () => {
        await request
            .put("/api/customer/" + id)
            .send(customerNewData)
            .then((res) => {
                expect(res.statusCode).toBe(401)
                expect(res.type).toBe('application/json')
            })
    })
    test('GET /api/vehicles/ with authentication', async () => {
        await request
            .get('/api/vehicles')
            .set("x-access-token",token)
            .then(res => {
                expect(res.statusCode).toBe(200)
                expect(res.type).toBe('application/json')
            })
    })
    test('GET /api/vehicles/ without authentication', async () => {
        await request
            .get('/api/vehicles')
            .then(res => {
                expect(res.statusCode).toBe(401)
                expect(res.type).toBe('application/json')
            })
    })
})