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
