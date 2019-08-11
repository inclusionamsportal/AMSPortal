const Sequelize = require('sequelize')
const db = require('../db')

const ApplicationComments = db.define('applicationComments', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

ApplicationComments.prototype.boughtTrue = function() {
  this.bought = true
}

module.exports = ApplicationComments
