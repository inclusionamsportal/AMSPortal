const router = require('express').Router()
const {Forms, Applications, Admins} = require('../db/models')

module.exports = router

//Display all forms for public user
router.get('/', async (req, res, next) => {
  try {
    const forms = await Forms.findAll({
      where: {isActive: 'true'}
    })
    res.json(forms)
  } catch (err) {
    next(err)
  }
})

//Display form by ID for Admins.
router.get('/:id', async (req, res, next) => {
  if (!req.Admin) {
    res.send(404, 'You do not have access')
  }
  try {
    const id = req.params.id
    const foundForm = await Forms.findByPk(id)
    res.json(foundForm)
  } catch (err) {
    res.status(err)
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  if (!req.Admin) {
    res.send(404, 'You do not have access')
  }
  try {
    await Forms.create({...req.body})
    res.status(201).send('Form added.')
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  if (!req.Admin) {
    res.send(404, 'You do not have access')
  }

  try {
    const id = req.params.id
    const form = await Forms.findByPk(id)
    const updatedForm = await form.update({...req.body})
    res.send(updatedForm)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  if (!req.Admin) {
    res.send(404, 'You do not have access')
  }
  try {
    const id = req.params.id
    const deleted = await Forms.destroy({
      where: {
        id: id
      }
    })
    res.json(`Form ${id} Deleted`)
  } catch (err) {
    next(err)
  }
})
