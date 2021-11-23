const supertest = require("supertest")
const app = require("../app")
const request = supertest(app)
const db = require("../services/database")

const merchantNewData = { merchantName: 'test-merchant' };
const dummyCar = {
    vehicleModel: "test_model",
    vehicleRegistration: "test_registration",
    vehicleRentRate: 5000
}



describe("Testing all merchant related routes", () => {
    let token,id;
    beforeAll(async () => {
        await request
            .post("/api/auth/merchant/login/")
            .send({
                merchantEmail: "test@merchant.com",
                password: "testpassword"
            })
            .then((res) => {
                token = JSON.parse(res.text).token
                console.log(token)
                id = JSON.parse(res.text).merchantId
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
    test('GET /api/merchant/:id without token', async ()=>{
        await request
            .get("/api/merchant/" + id)
            .then((res) => {
                expect(res.statusCode).toBe(401)
            })
    })
    test('GET /api/merchant/:id with token', async () => {
        await request
            .get("/api/merchant/" + id)
            .set("x-access-token",token)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.type).toBe('application/json')
            })
    })
    test('GET /api/booking/merchant/:id', async () => {
        await request
            .get("/api/booking/" + id)
            .set("x-access-token",token)
            .then((res) => {
                expect(res.statusCode).toBe(404)
            })
    })
    test('GET /api/booking/merchant/:id without token', async () => {
        await request
            .get("/api/booking/merchant/" + id)
            .then((res) => {
                expect(res.statusCode).toBe(401)
            })
    })
    test('PUT /api/merchant/:id', async () => {
        await request
            .put("/api/merchant/" + id)
            .set("x-access-token",token)
            .send(merchantNewData)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.type).toBe('application/json')
            })
    })
    test('PUT /api/merchant/:id', async () => {
        await request
            .put("/api/merchant/" + id)
            .send(merchantNewData)
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
            .get('/api/vehicles/')
            .then(res => {
                expect(res.statusCode).toBe(401)
                expect(res.type).toBe('application/json')
            })
    })
    test('Adding a new vehicle', async () => {
        await request
            .post('/api/vehicles/')
            .set("x-access-token",token)
            .send({ merchantId: id, ...dummyCar })
            .then(res => {
                expect(res.statusCode).toBe(200)
                expect(res.type).toBe('application/json')
            })
    })
    test('Adding a new vehicle without authentication', async () => {
        await request
            .post('/api/vehicles/')
            .send({ merchantId: id, ...dummyCar })
            .then(res => {
                expect(res.statusCode).toBe(401)
                expect(res.type).toBe('application/json')
            })
    })
})