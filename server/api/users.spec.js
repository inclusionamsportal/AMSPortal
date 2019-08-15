/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Admins = db.model('admins')

describe('Admins routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/admins/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return Admins.create({
        username: codysEmail
      })
    })

    it('GET /api/admins', async () => {
      const res = await request(app)
        .get('/api/admins')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].username).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
