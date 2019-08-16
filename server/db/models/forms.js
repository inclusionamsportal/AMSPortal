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
    defaultValue: new Date(Date.now() + 24 * 60 * 60 * 1000 * 30)
  },
  textBody: {
    type: Sequelize.JSON
  }
})

module.exports = Forms
