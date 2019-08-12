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

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const foundForm = await Forms.findByPk(id)
    res.json(foundForm)
  } catch (err) {
    res.status(err)
    next(err)
  }
})
