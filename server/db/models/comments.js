const Sequelize = require('sequelize')
const db = require('../db')

const Comments = db.define('comments', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  commentBody: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  },
  adminName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  applicantName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

Comments.prototype.boughtTrue = function() {
  this.bought = true
}

module.exports = Comments
