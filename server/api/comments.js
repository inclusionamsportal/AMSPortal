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
