const Sequelize = require('sequelize')
const db = require('../db')

const Applications = db.define('applications', {
  applicantName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.ENUM('UNDER REVIEW', 'REJECTED', 'ACCEPTED'),
    allowNull: false
  },
  applicantEmail: {
    type: Sequelize.STRING
  }
})

module.exports = Applications
