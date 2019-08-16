const Admins = require('./admins')
const Applications = require('./applications')
const Comments = require('./comments')
const Forms = require('./forms')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Forms.hasMany(Applications)
Applications.belongsTo(Forms, {
  foreignKey: 'formId',
  targetKey: 'id'
})

Admins.hasMany(Comments)
Comments.belongsTo(
  Admins,

  {foreignKey: 'adminId', targetKey: 'id'}
)
// Comments.belongsTo(
//   Admins,
//   {constraints: false},
//   {foreignKey: 'adminName', targetKey: 'username'}
// )

// Comments.findAll({model: [Admins]})

Applications.belongsTo(
  Comments,
  {constraints: false},
  {
    foreignKey: 'applicantName',
    targetKey: 'applicantName'
  }
)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  Forms,
  Admins,
  Comments,
  Applications
}
