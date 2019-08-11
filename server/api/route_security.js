// admin authentication middleware - if the person is an admin, let them view all users, if not, redirect to our homepage - if someone is not an admin, they should only be able to see their own user information
// function isAdmin(req, res, next) {
//   if (req.user && req.user.isAdmin === true) return next()
//   res.redirect('/')
// }

// function isAdminOrUser(req, res, next) {
//   if (req.user && (req.user.id == req.body.id || req.user.isAdmin))
//     return next()
//   res.sendStatus(401)
// }

//middleware to check if a person is logged in before loading orders/cart
// const isLoggedInUser = (req, res, next) => {
//   if (req.user.id === req.body.id) next()
//   res.redirect('/')
// }

//module.exports = {
// isAdminOrUser,
//  isAdmin
// isLoggedInUser
//}
