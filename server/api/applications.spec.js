/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Applications = db.model('applications')

describe('Applications routes', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })

    describe('/api/admins/', () => {
        const cody = 'codypop'

        beforeEach(() => {
            return Admins.create({
                username: cody
            })
        })

        it('GET /api/admins', async () => {
            const res = await request(app)
                .get('/api/admins')
                .expect(200)

            expect(res.body).to.be.an('array')
            expect(res.body[0].username).to.be.equal(cody)
        })

        it('GET /api/admins/:id', async () => {
            const res = await request(app)
                .get('/api/admins/1')
                .expect(200)
            // console.log('hm',typeof res.body)
            expect(res.body).to.be.an('object')
            // expect(res.body[0].username).to.be.equal(cody)
        })

    }) // end describe('/api/users')
}) // end describe('User routes')
