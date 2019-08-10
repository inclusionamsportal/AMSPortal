const Sequelize = require('sequelize')
const db = require('../db')

const FormFields = db.define('formFields', {
  formId: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  }
})

FormFields.prototype.boughtTrue = function() {
  this.bought = true
}

module.exports = FormFields
