const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async() => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async() => {
        await connection.destroy()
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "apades",
                email: "cont@g.com",
                whatsapp: "2342302222",
                city: "asd",
                uf: "sc"
            })

            //console.log(response.body) //fez criar o test.sqlite
            expect(response.body).toHaveProperty('id')
            expect(response.body.id).toHaveLength(8)
    })
})