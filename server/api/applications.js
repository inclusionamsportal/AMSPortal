const router = require('express').Router()
const {Applications} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  if (!req.user) {
    res.send(404, 'You do not have access')
  }
  try {
    const applications = await Applications.findAll({
      order: [['id', 'DESC']]
    })
    res.json(applications)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  if (!req.user) {
    res.send(404, 'You do not have access')
  }
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
  console.log('hitting post route')
  try {
    const fullName = req.body.applicantName
    const email = req.body.applicantEmail
    const body = req.body.applicationBody
    const id = req.body.formId
    const newApplication = await Applications.create({
      applicantName: fullName,
      applicantEmail: email,
      applicationBody: body,
      status: 'UNDER REVIEW',
      formId: id
    })
    res

      .json(newApplication)
      .status(201)
      .send('Application created.')
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  if (!req.user) {
    res.send(404, 'You do not have access')
  }
  try {
    const id = req.params.id
    const application = await Applications.findByPk(id)
    const updatedApplication = await application.update({...req.body})
    res.send(updatedApplication)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  if (!req.user) {
    res.send(404, 'You do not have access')
  }
  try {
    const id = req.params.id
    const deleted = await Applications.destroy({
      where: {
        id: id
      }
    })
    res.json(`Application ${id} Deleted`)
  } catch (err) {
    next(err)
  }
})
