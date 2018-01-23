// TODO: replace by npm module.

require('babel-core/register')

const mongoose = require('mongoose')

// Get arguments passed on command line
const userArgs = process.argv.slice(2)
if (!userArgs[0].startsWith('mongodb://')) {
  console.log('ERROR: You need to specify a valid mongodb URL as the first argument')
}
const mongodb = userArgs[0]
mongoose.connect(mongodb)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

/* Examples */
/*
const async = require('async')

const Athlete = require('./src/models/Athlete').default
const Team = require('./src/models/Team').default

const athletes = []
const teams = []

function atlheteCreate (firstname, lastname, nickname, team, cb) {
  const athlete = new Athlete({
    firstname: firstname,
    lastname: lastname,
    nickname: nickname,
    team: team
  })
  athlete.save(err => {
    if (err) { return cb(err, null) }

    console.log(`New Athlete: ${athlete}`)
    athletes.push(athlete)
    cb(null, athlete)
  })
}

function teamCreate (name, url, cb) {
  const team = new Team({
    name: name,
    url: url
  })
  team.save(err => {
    if (err) { return cb(err, null) }
    console.log(`New Team: ${team}`)
    teams.push(team)
    cb(null, team)
  })
}

function createAthletes (cb) {
  async.parallel([
    (cb) => atlheteCreate('Gaëtan', 'Meynier', 'Vikingdufutur', teams[0], cb),
    (cb) => atlheteCreate('Vincent', 'Pemeja', 'Vince', teams[0], cb)
  ], cb)
}

function createTeams (cb) {
  async.parallel([
    () => teamCreate('NXC', 'http://', cb)
  ], cb)
}

db.collections['athletes'].drop(err => {
  if (err) { return console.log(err) }
  console.log(`athletes collection dropped`)
})

db.collections['teams'].drop(err => {
  if (err) { return console.log(err) }
  console.log(`teams collection dropped`)
})

async.series([
  createTeams,
  createAthletes
], (err, res) => {
  if (err) { console.log(`FINAL ERR: ${err}`) }

  db.close()
})
*/
