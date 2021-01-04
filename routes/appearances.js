var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function (req, res, next) {
  knex('appearances')
    .join('movies', 'appearances.movie_id', '=', 'movies.id')
    .join('actors', 'appearances.actor_id', '=', 'actors.id')
    .select('movies.title', 'movies.release_year', 'actors.name', 'actors.dob', 'appearances.character')
    .then(function (appearances) {
      res.json(appearances)
    }).catch(function (err) {
      next(new Error(err));
    })
});

module.exports = router;
