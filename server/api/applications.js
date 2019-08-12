const router = require('express').Router()
const {Applications} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const applications = await Applications.findAll()
    res.json(applications)
  } catch (err) {
    next(err)
  }
})
