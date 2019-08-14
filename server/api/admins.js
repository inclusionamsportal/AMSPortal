const router = require('express').Router()
const {Admins} = require('../db/models')
//const {isAdmin} = require('./route_security')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const admins = await Admins.findAll({
      ///JUST AN EXAMPLE
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['username', 'password']
    })
    res.json(admins)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const foundAdmin = await Admins.findByPk(id)
    res.json(foundAdmin)
  } catch (err) {
    res.status(err)
    next(err)
  }
})

//PUT for when updating account information for admins
router.put('/', async (req, res, next) => {
  try {
    const admin = req.body
    const updateAdmin = await Admins.update(
      {...admin},
      {
        where: {
          username: admin.username,
          password: admin.password
        }
      }
    )
    res.status(204)
  } catch (error) {
    next(error)
  }
})

// // admin authentication middleware - if the person is an admin, let them view all users, if not, redirect to our homepage - if someone is not an admin, they should only be able to see their own user information
// function isAdmin(req, res, next) {
//   if (req.user && req.user.isAdmin === true) return next()
//   res.redirect('/')
// }
