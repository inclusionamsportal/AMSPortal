const router = require('express').Router()
const {Forms} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const forms = await Forms.findAll()
    res.json(forms)
  } catch (err) {
    next(err)
  }
})
