const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Admins = db.define('admins', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  googleId: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING,
    unique: true
    // allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  }
})

module.exports = Admins

/**
 * instanceMethods
 */
Admins.prototype.correctPassword = function(candidatePwd) {
  return Admins.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
Admins.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Admins.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = admins => {
  if (admins.changed('password')) {
    admins.salt = Admins.generateSalt()
    admins.password = Admins.encryptPassword(admins.password(), admins.salt())
  }
}

Admins.beforeCreate(setSaltAndPassword)
Admins.beforeUpdate(setSaltAndPassword)
