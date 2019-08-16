const Sequelize = require('sequelize')
const db = require('../db')

const Comments = db.define('comments', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  commentBody: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  },
  adminId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  adminName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  applicantName: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Comments.prototype.boughtTrue = function() {
  this.bought = true
}

module.exports = Comments
