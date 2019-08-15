const Sequelize = require('sequelize')
const db = require('../db')

const Forms = db.define('forms', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  isActive: {
    type: Sequelize.BOOLEAN(),
    allowNull: false
  },
  deadline: {
    type: Sequelize.DATE,
    default: new Date(Date.now() + 24 * 60 * 60 * 1000 * 30),
    allowNull: false
  },
  textBody: {
    type: Sequelize.STRING
  }
})

module.exports = Forms
