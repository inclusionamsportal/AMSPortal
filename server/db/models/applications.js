const Sequelize = require('sequelize')
const db = require('../db')

const Applications = db.define('applications', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  applicantName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, //an applicant can only apply once
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
  },
  applicationBody: {
    type: Sequelize.JSON
  }
})

module.exports = Applications
