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
    const foundApplication = await Applications.findByPk(id)
    res.json(foundApplication)
  } catch (err) {
    res.status(err)
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  if (req.Admins.isAdmin === false) {
    res.send(404, 'You do not have access.')
  }
  try {
    await Applications.create({...req.body})
    res.status(201).send('Application created.')
  } catch (err) {
    next(err)
  }
})
