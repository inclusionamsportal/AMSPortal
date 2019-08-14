const router = require('express').Router()
const {Comments} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const comments = await Comments.findAll()
    res.json(comments)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const foundComment = await Comments.findByPk(id)
    res.json(foundComment)
  } catch (err) {
    res.status(err)
    next(err)
  }
})

//find all the comments for a certain applicant/application
router.get('/:applicantName', async (req, res, next) => {
  try {
    const applicantName = req.params.applicantName
    const appComment = await Comments.findAllByPk(applicantName)
    res.json(appComment)
  } catch (err) {
    res.status(err)
    next(err)
  }
})
