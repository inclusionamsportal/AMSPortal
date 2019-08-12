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

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const foundApplication = await Applications.findById(id)
    res.json(foundApplication)
  } catch (err) {
    res.status(err)
    next(err)
  }
})
