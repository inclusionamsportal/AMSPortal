const router = require('express').Router()
module.exports = router

router.use('/admins', require('./admins'))
router.use('/applications', require('./applications'))
router.use('/comments', require('./comments'))
router.use('/forms', require('./forms'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
