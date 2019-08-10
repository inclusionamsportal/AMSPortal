const Sequelize = require('sequelize')
const db = require('../db')

const Comments = db.define('comments', {
  commentBody: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  }
})

Comments.prototype.boughtTrue = function() {
  this.bought = true
}

module.exports = Comments
