const Sequelize = require('sequelize')
const db = require('../db')

const Forms = db.define('forms', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isActive: {
    type: Sequelize.ENUM('NEW', 'NOT ACTIVE'),
    allowNull: false
  },
  deadline: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = Forms
