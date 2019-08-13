'use strict'

const db = require('../server/db')
const {Admins, Comments, Forms, Applications} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const admins = [
    {username: 'nibbler', password: '123'},
    {username: 'bender', password: '456'}
  ]

  const comments = [
    {
      applicantName: 'Philip J. Fry',
      commentBody: ' This person is highly qualified.',
      adminId: 1
    },
    {
      applicantName: 'Turanga Leela',
      commentBody: 'This person is very impressive',

      adminId: 1
    },
    {
      applicantName: 'Doctor Zoidberg',
      commentBody: "I'm not too sure about this person.",
      adminId: 1
    }
  ]

  const forms = [
    {
      title: 'Inclusion application',
      isActive: true,
      deadline: '09/20/2019'
    },
    {
      title: 'Another application',
      isActive: false,
      deadline: '09/21/2019'
    }
  ]

  const applications = [
    {
      applicantName: 'Turanga Leela',

      status: 'UNDER REVIEW',
      applicantEmail: 'leela@gmail.com',
      applicationBody: 'I am applying because I love programming.',
      formId: 1
    },
    {
      applicantName: 'Doctor Zoidberg',

      status: 'REJECTED',
      applicantEmail: 'zoid@gmail.com',
      applicationBody: "I'm applying because I love algorithms.",
      formId: 1
    },

    {
      applicantName: 'Philip J. Fry',

      status: 'ACCEPTED',
      applicantEmail: 'fry@gmail.com',
      applicationBody: "I'm applying because of the awesome instructors.",
      formId: 1
    }
  ]

  await Promise.all(admins.map(admin => Admins.create(admin)))
  await Promise.all(comments.map(comment => Comments.create(comment)))
  await Promise.all(forms.map(form => Forms.create(form)))
  await Promise.all(applications.map(app => Applications.create(app)))

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
