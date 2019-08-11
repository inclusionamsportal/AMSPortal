const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin} = require('./route_security')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      ///JUST AN EXAMPLE
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['username', 'password']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// router.put('/', isAdminOrUser, async (req, res, next) => {
//   try {
//     const user = req.body
//     const updatedUser = await User.update(
//       {...user},
//       {
//         where: {
//           id: user.id,
//           email: user.email
//         }
//       }
//     )
//     res.status(204)
//   } catch (error) {
//     next(error)
//   }
// })

// // admin authentication middleware - if the person is an admin, let them view all users, if not, redirect to our homepage - if someone is not an admin, they should only be able to see their own user information
// function isAdmin(req, res, next) {
//   if (req.user && req.user.isAdmin === true) return next()
//   res.redirect('/')
// }
